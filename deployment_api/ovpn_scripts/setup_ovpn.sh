#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Setting up OpenVPN TAP Server (One-time setup)...${NC}"

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root${NC}"
   exit 1
fi

# Install required packages
echo -e "${YELLOW}Installing required packages...${NC}"
apt-get update

# Pre-configure iptables-persistent to avoid interactive prompts
echo iptables-persistent iptables-persistent/autosave_v4 boolean true | debconf-set-selections
echo iptables-persistent iptables-persistent/autosave_v6 boolean true | debconf-set-selections

# Install packages non-interactively
DEBIAN_FRONTEND=noninteractive apt-get install -y openvpn easy-rsa bridge-utils iptables-persistent

# Create base directories
echo -e "${YELLOW}Creating directory structure...${NC}"
mkdir -p /etc/openvpn/easy-rsa
mkdir -p /var/log/openvpn

# Setup Easy-RSA (one-time PKI setup)
echo -e "${YELLOW}Setting up Easy-RSA PKI...${NC}"
if [ -d "/etc/openvpn/easy-rsa/pki" ]; then
    echo -e "${YELLOW}PKI already exists. Skipping CA creation...${NC}"
else
    # Remove existing directory if it exists but is incomplete
    if [ -d "/etc/openvpn/easy-rsa" ]; then
        echo -e "${YELLOW}Removing incomplete Easy-RSA directory...${NC}"
        rm -rf /etc/openvpn/easy-rsa
    fi
    
    # Create fresh Easy-RSA setup
    make-cadir /etc/openvpn/easy-rsa
    cd /etc/openvpn/easy-rsa
    
    # Initialize PKI and build CA (batch mode)
    ./easyrsa init-pki
    ./easyrsa --batch build-ca nopass
    
    # Generate DH parameters (shared across all servers)
    ./easyrsa gen-dh
    
    # Generate TLS-Auth key (shared)
    openvpn --genkey --secret pki/ta.key
    
    echo -e "${GREEN}PKI setup completed!${NC}"
fi

# Enable IP forwarding
echo -e "${YELLOW}Enabling IP forwarding...${NC}"
echo 'net.ipv4.ip_forward=1' >> /etc/sysctl.conf
sysctl -p

echo -e "${GREEN}Base OpenVPN setup completed!${NC}"
echo -e "${YELLOW}Now you can run: ./add_user.sh <user_id> to create user configurations${NC}"

#################################################################
# USER ADDITION SCRIPT
#################################################################

cat > ./add_user.sh << 'EOF'
#!/bin/bash
# Add OpenVPN User with dedicated bridge and configuration
# Usage: ./add_user.sh <user_id>

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root${NC}"
   exit 1
fi

# Get user ID
if [ -z "$1" ]; then
    echo -e "${YELLOW}Usage: $0 <user_id>${NC}"
    echo "Example: $0 2"
    exit 1
fi

USER_ID="$1"

# Validate user ID (must be numeric)
if ! [[ "$USER_ID" =~ ^[0-9]+$ ]]; then
    echo -e "${RED}User ID must be numeric${NC}"
    exit 1
fi

# Configuration based on user ID
SERVER_NAME="server${USER_ID}"
BRIDGE_NAME="br${USER_ID}"
TAP_INTERFACE="tap${USER_ID}"
ETH_INTERFACE="eth${USER_ID}"
SUBNET="10.${USER_ID}.0"
BRIDGE_IP="${SUBNET}.1"
BRIDGE_NETMASK="255.255.0.0"
BRIDGE_POOL_START="${SUBNET}.100"
BRIDGE_POOL_END="${SUBNET}.200"
PORT=$((500 + USER_ID))
CONFIG_DIR="/etc/openvpn/user${USER_ID}"
EASY_RSA_DIR="/etc/openvpn/easy-rsa"

echo -e "${GREEN}Creating OpenVPN configuration for User ID: ${USER_ID}${NC}"
echo -e "${YELLOW}Bridge: ${BRIDGE_NAME}, TAP: ${TAP_INTERFACE}, Subnet: ${SUBNET}.0/16, Port: ${PORT}${NC}"

# Check if user already exists
if [ -d "$CONFIG_DIR" ]; then
    echo -e "${RED}User ${USER_ID} already exists!${NC}"
    exit 1
fi

# Create user-specific directories
mkdir -p $CONFIG_DIR
mkdir -p $CONFIG_DIR/ccd
mkdir -p $CONFIG_DIR/clients

# Generate server certificate for this user (batch mode)
echo -e "${YELLOW}Generating server certificate for ${SERVER_NAME}...${NC}"
cd $EASY_RSA_DIR
./easyrsa --batch build-server-full $SERVER_NAME nopass

# Generate default client certificate automatically (batch mode)
echo -e "${YELLOW}Generating default client certificate...${NC}"
./easyrsa --batch build-client-full "client${USER_ID}" nopass

# Copy certificates to user directory
cp pki/ca.crt $CONFIG_DIR/
cp pki/issued/$SERVER_NAME.crt $CONFIG_DIR/
cp pki/private/$SERVER_NAME.key $CONFIG_DIR/
cp pki/dh.pem $CONFIG_DIR/
cp pki/ta.key $CONFIG_DIR/

# Create default client configuration automatically
echo -e "${YELLOW}Creating default client configuration...${NC}"
cat > $CONFIG_DIR/clients/client${USER_ID}.ovpn << CLIENT_EOF
client
dev tap
dev-type tap
proto udp
remote YOUR_SERVER_IP ${PORT}
resolv-retry infinite
nobind
persist-key
persist-tun
cipher AES-256-CBC
auth SHA256
verb 3

<ca>
$(cat pki/ca.crt)
</ca>

<cert>
$(cat pki/issued/client${USER_ID}.crt)
</cert>

<key>
$(cat pki/private/client${USER_ID}.key)
</key>

<tls-auth>
$(cat pki/ta.key)
</tls-auth>
key-direction 1
CLIENT_EOF

# Set proper permissions
chmod 600 $CONFIG_DIR/clients/client${USER_ID}.ovpn

# Create server configuration
echo -e "${YELLOW}Creating server configuration...${NC}"
cat > $CONFIG_DIR/server.conf << CONF_EOF
port ${PORT}
proto udp
dev ${TAP_INTERFACE}
dev-type tap
ca ca.crt
cert ${SERVER_NAME}.crt
key ${SERVER_NAME}.key
dh dh.pem
tls-auth ta.key 0
server-bridge ${BRIDGE_IP} ${BRIDGE_NETMASK} ${BRIDGE_POOL_START} ${BRIDGE_POOL_END}
push "route ${SUBNET}.0 255.255.0.0"
client-config-dir ccd
client-to-client
log-append /var/log/openvpn/user${USER_ID}.log
status /var/log/openvpn/user${USER_ID}-status.log
verb 3
cipher AES-256-CBC
auth SHA256
tls-version-min 1.2
keepalive 10 120
persist-key
persist-tun
user nobody
group nogroup
duplicate-cn
CONF_EOF

# Create bridge management scripts
echo -e "${YELLOW}Creating bridge management scripts...${NC}"

# Bridge start script
cat > $CONFIG_DIR/bridge-start.sh << BRIDGE_START_EOF
#!/bin/bash
set -e
USER_ID="${USER_ID}"
BRIDGE_NAME="br${USER_ID}"
TAP_INTERFACE="tap${USER_ID}"
ETH_INTERFACE="eth${USER_ID}"
BRIDGE_IP="10.${USER_ID}.0.1"

echo "Starting bridge for User \${USER_ID}..."
brctl addbr \$BRIDGE_NAME 2>/dev/null || echo "Bridge \$BRIDGE_NAME already exists"
if ip link show \$ETH_INTERFACE >/dev/null 2>&1; then
    brctl addif \$BRIDGE_NAME \$ETH_INTERFACE
    ip link set \$ETH_INTERFACE promisc on
    echo "Added \$ETH_INTERFACE to bridge"
else
    echo "Warning: \$ETH_INTERFACE not found, bridge will work without physical interface"
fi
openvpn --mktun --dev \$TAP_INTERFACE
brctl addif \$BRIDGE_NAME \$TAP_INTERFACE
ip link set \$TAP_INTERFACE up
ip link set \$TAP_INTERFACE promisc on
ip addr add \${BRIDGE_IP}/16 dev \$BRIDGE_NAME 2>/dev/null || echo "IP already assigned"
ip link set \$BRIDGE_NAME up
echo "Bridge \$BRIDGE_NAME started successfully"
BRIDGE_START_EOF

# Bridge stop script
cat > $CONFIG_DIR/bridge-stop.sh << BRIDGE_STOP_EOF
#!/bin/bash
set -e
USER_ID="${USER_ID}"
BRIDGE_NAME="br${USER_ID}"
TAP_INTERFACE="tap${USER_ID}"
ETH_INTERFACE="eth${USER_ID}"

echo "Stopping bridge for User \${USER_ID}..."
ip link set \$BRIDGE_NAME down 2>/dev/null || true
brctl delif \$BRIDGE_NAME \$ETH_INTERFACE 2>/dev/null || true
brctl delif \$BRIDGE_NAME \$TAP_INTERFACE 2>/dev/null || true
brctl delbr \$BRIDGE_NAME 2>/dev/null || true
openvpn --rmtun --dev \$TAP_INTERFACE 2>/dev/null || true
ip link set \$ETH_INTERFACE promisc off 2>/dev/null || true
echo "Bridge \$BRIDGE_NAME stopped"
BRIDGE_STOP_EOF

# Make scripts executable
chmod +x $CONFIG_DIR/bridge-start.sh
chmod +x $CONFIG_DIR/bridge-stop.sh

# Create systemd services
cat > /etc/systemd/system/openvpn-bridge-user${USER_ID}.service << SERVICE_EOF
[Unit]
Description=OpenVPN Bridge for User ${USER_ID}
Before=openvpn@user${USER_ID}.service
After=network.target

[Service]
Type=oneshot
ExecStart=${CONFIG_DIR}/bridge-start.sh
ExecStop=${CONFIG_DIR}/bridge-stop.sh
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
SERVICE_EOF

cat > /etc/systemd/system/openvpn@user${USER_ID}.service << OVPN_SERVICE_EOF
[Unit]
Description=OpenVPN connection to user${USER_ID}
After=openvpn-bridge-user${USER_ID}.service
Requires=openvpn-bridge-user${USER_ID}.service
PartOf=openvpn.service
ReloadPropagatedFrom=openvpn.service
Before=systemd-user-sessions.service

[Service]
Type=notify
PrivateTmp=true
WorkingDirectory=${CONFIG_DIR}
ExecStart=/usr/sbin/openvpn --daemon ovpn-user${USER_ID} --status /run/openvpn/user${USER_ID}.status 10 --cd ${CONFIG_DIR} --config ${CONFIG_DIR}/server.conf --writepid /run/openvpn/user${USER_ID}.pid
PIDFile=/run/openvpn/user${USER_ID}.pid
KillMode=process
ExecReload=/bin/kill -HUP \$MAINPID
LimitNPROC=100
Restart=on-failure
RestartSec=5
TimeoutStopSec=5

[Install]
WantedBy=multi-user.target
OVPN_SERVICE_EOF

# Configure firewall
echo -e "${YELLOW}Configuring firewall for port ${PORT}...${NC}"
iptables -A INPUT -p udp --dport $PORT -j ACCEPT
iptables -A FORWARD -i $TAP_INTERFACE -j ACCEPT
iptables -A FORWARD -o $TAP_INTERFACE -j ACCEPT
iptables-save > /etc/iptables/rules.v4

# Reload systemd and enable services
systemctl daemon-reload
systemctl enable openvpn-bridge-user${USER_ID}
systemctl enable openvpn@user${USER_ID}

# Auto-start services
echo -e "${YELLOW}Starting services...${NC}"
systemctl start openvpn-bridge-user${USER_ID}
systemctl start openvpn@user${USER_ID}

echo -e "${GREEN}User ${USER_ID} configuration created and started successfully!${NC}"
echo -e "${YELLOW}Configuration directory: ${CONFIG_DIR}${NC}"
echo -e "${YELLOW}OpenVPN Port: ${PORT}, Bridge: ${BRIDGE_NAME} (${BRIDGE_IP}/16)${NC}"
echo -e "${YELLOW}Client config: ${CONFIG_DIR}/clients/client${USER_ID}.ovpn${NC}"
echo -e "${YELLOW}Services are now running. Remember to replace 'YOUR_SERVER_IP' in client config.${NC}"
EOF

chmod +x ./add_user.sh

#################################################################
# CLIENT CREATION SCRIPT
#################################################################

cat > ./create_client.sh << 'EOF'
#!/bin/bash
# Create client certificate for specific user
# Usage: ./create_client.sh <user_id> <client_name>

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root${NC}"
   exit 1
fi

# Get parameters
if [ -z "$1" ] || [ -z "$2" ]; then
    echo -e "${YELLOW}Usage: $0 <user_id> <client_name>${NC}"
    echo "Example: $0 2 john"
    exit 1
fi

USER_ID="$1"
CLIENT_NAME="$2"
CONFIG_DIR="/etc/openvpn/user${USER_ID}"
EASY_RSA_DIR="/etc/openvpn/easy-rsa"
PORT=$((500 + USER_ID))

# Check if user config exists
if [ ! -d "$CONFIG_DIR" ]; then
    echo -e "${RED}User ${USER_ID} configuration not found! Run ./add_user.sh ${USER_ID} first${NC}"
    exit 1
fi

# Check if client already exists
if [ -f "$CONFIG_DIR/clients/${CLIENT_NAME}.ovpn" ]; then
    echo -e "${RED}Client ${CLIENT_NAME} already exists for user ${USER_ID}!${NC}"
    exit 1
fi

echo -e "${GREEN}Creating client certificate: ${CLIENT_NAME} for User ${USER_ID}${NC}"

# Generate client certificate (batch mode)
cd $EASY_RSA_DIR
./easyrsa --batch build-client-full "${USER_ID}-${CLIENT_NAME}" nopass

# Create client configuration
mkdir -p $CONFIG_DIR/clients
cat > $CONFIG_DIR/clients/${CLIENT_NAME}.ovpn << CLIENT_EOF
client
dev tap
dev-type tap
proto udp
remote YOUR_SERVER_IP ${PORT}
resolv-retry infinite
nobind
persist-key
persist-tun
cipher AES-256-CBC
auth SHA256
verb 3

<ca>
$(cat pki/ca.crt)
</ca>

<cert>
$(cat pki/issued/${USER_ID}-${CLIENT_NAME}.crt)
</cert>

<key>
$(cat pki/private/${USER_ID}-${CLIENT_NAME}.key)
</key>

<tls-auth>
$(cat pki/ta.key)
</tls-auth>
key-direction 1
CLIENT_EOF

# Set permissions
chmod 600 $CONFIG_DIR/clients/${CLIENT_NAME}.ovpn

echo -e "${GREEN}Client ${CLIENT_NAME} created successfully!${NC}"
echo -e "${YELLOW}Configuration file: $CONFIG_DIR/clients/${CLIENT_NAME}.ovpn${NC}"
echo -e "${YELLOW}Port: ${PORT}. Replace 'YOUR_SERVER_IP' with your actual server IP${NC}"
EOF

chmod +x ./create_client.sh

echo -e "${GREEN}All scripts created!${NC}"
echo ""
echo -e "${YELLOW}Usage:${NC}"
echo "1. First run: ${GREEN}./setup_openvpn.sh${NC} (this script - one time only)"
echo "2. Add users: ${GREEN}./add_user.sh <user_id>${NC} (services auto-start)"
echo ""
echo -e "${YELLOW}Example:${NC}"
echo "./add_user.sh 2    # Creates and starts user 2 (br2, port 502, auto-started)"
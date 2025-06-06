#!/bin/bash

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
    echo -e "${YELLOW}Usage: $0 <user_id> <public_ip>${NC}"
    echo "Example: $0 2"
    exit 1
fi

if [ -z "$2" ]; then
    echo -e "${YELLOW}Usage: $0 <user_id> <public_ip>${NC}"
    echo "Example: $0 2 1.2.3.4"
    exit 1
fi

PUBLIC_IP="$2"


USER_ID="$1"

# Validate user ID (must be numeric)
if ! [[ "$USER_ID" =~ ^[0-9]+$ ]]; then
    echo -e "${RED}User ID must be numeric${NC}"
    exit 1
fi

# Check if Easy-RSA is set up
if [ ! -d "/etc/openvpn/easy-rsa/pki" ]; then
    echo -e "${RED}Easy-RSA not found! Run ./build.sh first${NC}"
    exit 1
fi

# Configuration based on user ID
SERVER_NAME="server${USER_ID}"
BRIDGE_NAME="br${USER_ID}"
TAP_INTERFACE="tap${USER_ID}"
ETH_INTERFACE="eth${USER_ID}"
SUBNET="10.${USER_ID}.0"
BRIDGE_IP="${SUBNET}.253"
BRIDGE_NETMASK="255.255.0.0"
BRIDGE_POOL_START="${SUBNET}.100"
BRIDGE_POOL_END="${SUBNET}.200"
PORT=$((500 + USER_ID))
CONFIG_DIR="/etc/openvpn/user${USER_ID}"
EASY_RSA_DIR="/etc/openvpn/easy-rsa"

echo -e "${GREEN}Deploying OpenVPN configuration for User ID: ${USER_ID}${NC}"
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

echo -e "${YELLOW}Creating client-specific configuration for static IP...${NC}"
echo "ifconfig-push ${SUBNET}.100 ${BRIDGE_NETMASK}" > $CONFIG_DIR/ccd/client${USER_ID}


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
remote ${PUBLIC_IP} ${PORT}
resolv-retry infinite
nobind
persist-key
persist-tun
cipher AES-256-CBC
auth SHA256
explicit-exit-notify
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
keepalive 2 30
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
BRIDGE_IP="10.${USER_ID}.0.253"

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

echo -e "${GREEN}User ${USER_ID} deployed and started successfully!${NC}"
echo -e "${YELLOW}Configuration directory: ${CONFIG_DIR}${NC}"
echo -e "${YELLOW}OpenVPN Port: ${PORT}, Bridge: ${BRIDGE_NAME} (${BRIDGE_IP}/16)${NC}"
echo -e "${YELLOW}Client config: ${CONFIG_DIR}/clients/client${USER_ID}.ovpn${NC}"
echo -e "${YELLOW}Services are running. Replace 'YOUR_SERVER_IP' in client config with your server IP.${NC}"
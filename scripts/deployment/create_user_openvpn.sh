#!/bin/sh

if [ "$#" -lt 3 ]; then
    echo "Usage: $0 <username> <password> <server_ip> [allowed_subnet]"
    echo "Example: $0 admin password 192.168.1.100 10.0.0.0/24"
    exit 1
fi

USERNAME=$1
PASSWORD=$2
SERVER_IP=$3
ALLOWED_SUBNET=$4

OUTPUT_DIR="/etc/openvpn/clients"
CLIENT_CONF="${OUTPUT_DIR}/${USERNAME}.ovpn"

# Create output directory
mkdir -p $OUTPUT_DIR

# Create client-specific configuration if subnet is specified
if [ ! -z "$ALLOWED_SUBNET" ]; then
    mkdir -p /etc/openvpn/ccd
    echo "iroute ${ALLOWED_SUBNET%/*} ${ALLOWED_SUBNET#*/}" > /etc/openvpn/ccd/$USERNAME
    
    # Add a static route on the server
    SUBNET_IP=${ALLOWED_SUBNET%/*}
    SUBNET_MASK=${ALLOWED_SUBNET#*/}
    case $SUBNET_MASK in
        24) NETMASK="255.255.255.0" ;;
        16) NETMASK="255.255.0.0" ;;
        8)  NETMASK="255.0.0.0" ;;
        *)  NETMASK="255.255.255.0" ;;
    esac
    
    # Add route to server.conf if not already there
    if ! grep -q "route $SUBNET_IP $NETMASK" /etc/openvpn/server.conf; then
        echo "route $SUBNET_IP $NETMASK" >> /etc/openvpn/server.conf
    fi
fi

# Update authentication script to accept the provided username/password
cat > /etc/openvpn/auth/check_auth.sh <<EOL
#!/bin/sh
USERNAME=\$(head -n1 \$1)
PASSWORD=\$(tail -n1 \$1)

# Simple authentication check
if [ "\$USERNAME" = "$USERNAME" ] && [ "\$PASSWORD" = "$PASSWORD" ]; then
    exit 0
else
    exit 1
fi
EOL

chmod +x /etc/openvpn/auth/check_auth.sh

# Create client configuration
cat > $CLIENT_CONF <<EOL
client
dev tun
proto tcp
remote $SERVER_IP 1194
resolv-retry infinite
nobind
persist-key
persist-tun
cipher AES-128-CBC
auth-user-pass
auth-nocache
verb 3
<key>
$(cat /etc/openvpn/keys/static.key)
</key>
EOL

# Restart OpenVPN to apply changes
rc-service openvpn restart

echo "Client configuration created at: $CLIENT_CONF"
echo "Username: $USERNAME"
echo "Password: $PASSWORD"
if [ ! -z "$ALLOWED_SUBNET" ]; then
    echo "Allowed subnet: $ALLOWED_SUBNET"
fi
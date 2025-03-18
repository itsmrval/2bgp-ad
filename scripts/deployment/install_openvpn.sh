#!/bin/sh

# Update and install required packages
apk update && apk add openvpn

# Setup directory structure
mkdir -p /etc/openvpn/keys /etc/openvpn/clients /etc/openvpn/ccd /etc/openvpn/auth

# Generate a static key instead of certificates
openvpn --genkey secret /etc/openvpn/keys/static.key

# Create a basic server configuration with static key
cat > /etc/openvpn/server.conf <<EOL
port 1194
proto tcp
dev tun
secret keys/static.key

# Network settings
server 10.8.0.0 255.255.255.0
ifconfig-pool-persist ipp.txt

# Authentication
auth-user-pass-verify /etc/openvpn/auth/check_auth.sh via-file
script-security 3
username-as-common-name

# Client specific configs
client-config-dir /etc/openvpn/ccd

# Push routes
push "redirect-gateway def1 bypass-dhcp"
push "dhcp-option DNS 8.8.8.8"

keepalive 10 120
cipher AES-128-CBC
user nobody
group nogroup
persist-key
persist-tun
status openvpn-status.log
verb 3
EOL

# Create authentication script
cat > /etc/openvpn/auth/check_auth.sh <<EOL
#!/bin/sh
USERNAME=\$(head -n1 \$1)
PASSWORD=\$(tail -n1 \$1)

# Simple authentication check
if [ "\$USERNAME" = "admin" ] && [ "\$PASSWORD" = "password" ]; then
    exit 0
else
    exit 1
fi
EOL

chmod +x /etc/openvpn/auth/check_auth.sh

# Enable IP forwarding
echo "net.ipv4.ip_forward = 1" > /etc/sysctl.d/99-openvpn.conf
sysctl -p /etc/sysctl.d/99-openvpn.conf

# Setup firewall rules if iptables is installed
if command -v iptables >/dev/null 2>&1; then
    iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE
    echo "iptables rules applied"
fi

# Start OpenVPN
rc-update add openvpn default
rc-service openvpn restart

echo "OpenVPN server setup complete with static key configuration."
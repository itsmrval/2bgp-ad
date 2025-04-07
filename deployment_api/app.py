from flask import Flask, request, jsonify, send_from_directory
import os
import subprocess
import json
import re
import uuid

app = Flask(__name__)

# config
WG_PLAYBOOK_PATH = './playbooks/wireguard_client.yml'
INF_PLAYBOOK_PATH = './playbooks/deploy_client.yml'
CONFIGS_DIR = './configs'

os.makedirs(CONFIGS_DIR, exist_ok=True)

# get content from proxmox_ip from ./playbooks/vars.yml
print('Loading configuration...')
try:
    with open('./playbooks/vars.yml', 'r') as f:
        lines = f.readlines()
        proxmox_ip = ''
        for line in lines:
            if 'proxmox_ip' in line:
                proxmox_ip = line.split(':')[1].strip()
                proxmox_ip = re.sub(r'\"', '', proxmox_ip)
                break
        if not proxmox_ip:
            raise ValueError('proxmox_ip not found in vars.yml')
    print(f'Using PVE IP {proxmox_ip}')
except Exception as e:
    print(f"Error loading configuration: {str(e)}")
    exit(1)

@app.route('/inf', methods=['POST'])
def create_infrastructure():
    data = request.json
    
    if not data or 'client_id' not in data:
        return jsonify({'error': 'Missing required fields: client_id'}), 400
    
    client_id = data['client_id']
    
    try:
        cmd = [
            'ansible-playbook', 
            INF_PLAYBOOK_PATH,
            f'--extra-vars=client_id={client_id}'
        ]
        
        result = subprocess.run(
            cmd, 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE,
            text=True
        )
        
        if result.returncode != 0:
            return jsonify({
                'status': 'error',
                'message': 'Ansible playbook execution failed',
                'error': result.stderr
            }), 500
        
        return jsonify({
            'status': 'success',
            'client_id': client_id,
            'message': 'Infrastructure generated successfully'
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/wg', methods=['POST'])
def generate_wireguard_client():
    data = request.json
    
    if not data or 'client_id' not in data:
        return jsonify({'error': 'Missing required fields: client_id'}), 400
    
    client_id = data['client_id']
    
    try:
        cmd = [
            'ansible-playbook', 
            WG_PLAYBOOK_PATH, 
            f'--extra-vars=client_id={client_id}'
        ]
        
        result = subprocess.run(
            cmd, 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE,
            text=True
        )
        
        if result.returncode != 0:
            return jsonify({
                'status': 'error',
                'message': 'Ansible playbook execution failed',
                'error': result.stderr
            }), 500
        
        return jsonify({
            'status': 'success',
            'client_id': client_id,
            'message': 'WireGuard client generated successfully'
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/wg/<int:client_id>', methods=['POST'])
def create_client(client_id):
    data = request.json
    
    if not data or 'private_key' not in data or 'public_key' not in data:
        return jsonify({'error': 'Missing required fields: private_key and public_key'}), 400
    
    private_key = data['private_key']
    public_key = data['public_key']
    server_public_key = data.get('server_public_key', '')
    
    filename = f'client_{client_id}.json'
    filepath = os.path.join(CONFIGS_DIR, filename)
    
    # Check if client already exists
    if os.path.exists(filepath):
        return jsonify({
            'status': 'error',
            'message': f'Client with ID {client_id} already exists'
        }), 409
    
    client_data = {
        'client_id': client_id,
        'private_key': private_key,
        'public_key': public_key,
        'server_public_key': server_public_key,
        'public_address': proxmox_ip
    }
    
    with open(filepath, 'w') as f:
        json.dump(client_data, f)
    
    return jsonify({
        'status': 'success',
        'client_id': client_id,
        'message': 'Client created successfully'
    })

@app.route('/wg/<int:client_id>', methods=['GET'])
def get_client_config(client_id):
    filename = f'client_{client_id}.json'
    filepath = os.path.join(CONFIGS_DIR, filename)
    
    if not os.path.exists(filepath):
        return jsonify({'error': 'Client not found'}), 404
    
    try:
        with open(filepath, 'r') as f:
            client_data = json.load(f)
        
        config_content = f"""[Interface]
PrivateKey = {client_data['private_key']}
Address = 172.17.{client_id}.2/30
DNS = 1.1.1.1, 8.8.8.8

[Peer]
PublicKey = {client_data['server_public_key']}
Endpoint = {proxmox_ip}:51{client_id}
AllowedIPs = 10.{client_id}.0.0/16,172.17.{client_id}.1/32
PersistentKeepalive = 5
"""
        
        return config_content, 200, {'Content-Type': 'text/plain', 'Content-Disposition': f'attachment; filename=client_{client_id}.conf'}
    
    except Exception as e:
        return jsonify({'error': f'Error generating client config: {str(e)}'}), 500

# Optional: Add a route to list all available clients
@app.route('/wg/clients', methods=['GET'])
def list_clients():
    try:
        clients = []
        for filename in os.listdir(CONFIGS_DIR):
            if filename.startswith('client_') and filename.endswith('.json'):
                client_id = filename.replace('client_', '').replace('.json', '')
                clients.append(int(client_id))
        
        return jsonify({
            'status': 'success',
            'clients': sorted(clients)
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    # Add debug=True to get more info on errors
    app.run(host='0.0.0.0', port=5000, debug=True)
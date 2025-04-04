from flask import Flask, request, jsonify, send_from_directory
import os
import subprocess
import json
import re
import uuid

app = Flask(__name__)

# config
WG_PLAYBOOK_PATH = './wireguard_client.yml'
CONFIGS_DIR = './configs'

os.makedirs(CONFIGS_DIR, exist_ok=True)

@app.route('/wg', methods=['POST'])
def generate_client():
    data = request.json
    
    if not data or 'client_id' not in data or 'public_address' not in data:
        return jsonify({'error': 'Missing required fields: client_id and public_address'}), 400
    
    client_id = data['client_id']
    public_address = data['public_address']
    
    try:
        cmd = [
            'ansible-playbook', 
            WG_PLAYBOOK_PATH, 
            f'--extra-vars=client_id={client_id} public_address={public_address}'
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
            'public_address': public_address,
            'message': 'Client generated successfully'
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
    public_address = data.get('public_address', 'vpn.2bgp-ad.rvcs.fr')
    
    filename = f'client_{client_id}.json'
    filepath = os.path.join(CONFIGS_DIR, filename)
    
    client_data = {
        'client_id': client_id,
        'private_key': private_key,
        'public_key': public_key,
        'server_public_key': server_public_key,
        'public_address': public_address
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
Endpoint = {client_data['public_address']}:51{client_id}
AllowedIPs = 10.{client_id}.0.0/16,172.17.{client_id}.1/32
PersistentKeepalive = 5
"""
        
        return config_content, 200, {'Content-Type': 'text/plain', 'Content-Disposition': f'attachment; filename=client_{client_id}.conf'}
    
    except Exception as e:
        return jsonify({'error': f'Error generating client config: {str(e)}'}), 500
        
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
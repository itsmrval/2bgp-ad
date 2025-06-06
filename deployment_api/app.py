from flask import Flask, request, jsonify, send_from_directory
import os
import subprocess
import json
import re
import threading
from datetime import datetime, timedelta
import logging

app = Flask(__name__)

# config
WG_PLAYBOOK_PATH = './playbooks/wireguard_client.yml'
INF_PLAYBOOK_PATH = './playbooks/deploy_client.yml'
CHECK_PLAYBOOK_PATH = './playbooks/check_state.yml'
CONFIGS_DIR = './configs'

os.makedirs(CONFIGS_DIR, exist_ok=True)

# get content from public_ip from ./playbooks/vars.yml
print('Loading configuration...')
try:
    with open('./playbooks/vars.yml', 'r') as f:
        lines = f.readlines()
        public_ip = ''
        for line in lines:
            if 'public_ip' in line:
                public_ip = line.split(':')[1].strip()
                public_ip = re.sub(r'\"', '', public_ip)
                break
        if not public_ip:
            raise ValueError('public_ip not found in vars.yml')
    print(f'Using Public IP {public_ip}')
except Exception as e:
    print(f"Error loading configuration: {str(e)}")
    exit(1)

@app.route('/vms/<int:client_id>', methods=['GET'])
def check_infrastructure(client_id):
    try:
        cmd = [
            'ansible-playbook', 
            CHECK_PLAYBOOK_PATH,
            f'--extra-vars=client_id={client_id}'
        ]
        
        result = subprocess.run(
            cmd, 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE,
            text=True
        )
        
        return jsonify({'success': (result.returncode == 0)})


    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/vms', methods=['POST'])
def create_infrastructure():
    data = request.json
    
    if not data or 'client_id' not in data:
        return jsonify({'error': 'Missing required fields: client_id'}), 400
    
    client_id = data['client_id']
    
    def run_playbook(client_id):
        try:
            cmd = [
                'ansible-playbook', 
                INF_PLAYBOOK_PATH,
                f'--extra-vars=client_id={client_id}'
            ]
            
            result = subprocess.Popen(
                cmd, 
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE,
                text=True
            )
            result.communicate()
            
        except Exception as e:
            print(f"Error running playbook for client {client_id}: {e}")

    threading.Thread(target=run_playbook, args=(client_id,)).start()
    
    return jsonify({
        'status': 'success',
        'client_id': client_id,
        'message': 'Infrastructure generated successfully'
    })
    
@app.route('/ovpn/<int:client_id>', methods=['GET'])
def get_ovpn_client(client_id):
    app.logger.info(f"Getting OVPN client info for client_id: {client_id}")
    
    filepath = f'/etc/openvpn/user{client_id}/clients/client{client_id}.ovpn'
    
    if not os.path.exists(filepath):
        app.logger.warning(f"OVPN file not found: {filepath}")
        return jsonify({'error': f'OVPN file for client {client_id} not found'}), 404
    
    try:
        with open(filepath, 'r') as f:
            ovpn_file_content = f.read()
        app.logger.info(f"Successfully read OVPN file for client {client_id}")

        # Check if client is online using static IP
        is_online = False
        static_ip = f"10.{client_id}.0.100"  # Static IP assigned to this client
        
        app.logger.info(f"Checking if client {client_id} is online at static IP: {static_ip}")
        
        try:
            result = subprocess.run(['ping', '-c', '1', '-W', '2', static_ip], 
                                  stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            is_online = result.returncode == 0
            app.logger.info(f"Ping to {static_ip}: {'SUCCESS' if is_online else 'FAILED'}")
        except Exception as e:
            app.logger.error(f"Error pinging {static_ip}: {e}")
            is_online = False
        
        return jsonify({
            'client_id': client_id,
            'online': is_online,
            'static_ip': static_ip,
            'profile': ovpn_file_content
        }), 200
    
    except Exception as e:
        app.logger.error(f"Error reading OVPN file: {e}")
        return jsonify({'error': f'Error reading OVPN file: {str(e)}'}), 500
    
@app.route('/ovpn/<int:client_id>', methods=['POST'])
def disabled_upload(client_id):
    return jsonify({
        'status': 'error',
        'message': 'Uploading .ovpn files is disabled now.'
    }), 403

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
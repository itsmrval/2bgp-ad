const axios = require('axios');

const sendVMDeploy = async (client_id) => {
    return axios.post(process.env.DEPLOYMENT_API_URL + '/vms', { client_id })
        .then(response => {
            if (response.data && response.data.status === 'success') {
                return true;
            } else {
                console.log('VMs deployment failed:', response.data);
                throw new Error('VMs deployment failed');
            }
        })
        .catch(error => {
            throw new Error(`VMs deployment error: ${error.message}`);
        });
};

const deployClient = async (client_id) => {
    try {
        await sendVMDeploy(client_id);
        return true;
    } catch (error) {
        console.error('Deployment error:', error);
    }
}

const retrieveWireguard = async (client_id) => {
    return axios.get(process.env.DEPLOYMENT_API_URL + '/ovpn/' + client_id)
        .then(response => {
            if (response.data && response.status === 200) {
                return response.data;
            } else {
                console.log('OVPN config retrieval failed:', response.data);
                return { "online": false }
            }
        })
        .catch(error => {
                console.log('OVPN config retrieval failed:', error.message);
                return { "online": false }

        });
}

const retrieveVM = async (client_id) => {
    return axios.get(process.env.DEPLOYMENT_API_URL + '/vms/' + client_id)
        .then(response => {
            if (response.data) {
                return { "online": response.data.success };
            } else {
                console.log('VM config retrieval failed:', response.data);
                return { "online": false }

            }
        })
        .catch(error => {
                console.log('VM config retrieval failed:', error.message);
                return { "online": false }

        });
}


module.exports = {
    deployClient,
    retrieveWireguard,
    retrieveVM
  }
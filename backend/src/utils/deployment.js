const axios = require('axios');

const sendWireguardDeploy = async (client_id) => {
    return axios.post(process.env.DEPLOYMENT_API_URL + '/wg', { client_id })
        .then(response => {
            if (response.data && response.data.success === true) {
                return true;
            } else {
                throw new Error('Wireguard deployment failed');
            }
        })
        .catch(error => {
            throw new Error(`Wireguard deployment error: ${error.message}`);
        });
};

const deployClient = async (client_id) => {
    try {
        const result = await sendWireguardDeploy(client_id);
        return result;
    } catch (error) {
        console.error('Deployment error:', error);
        throw error;
    }
}

export { deployClient };
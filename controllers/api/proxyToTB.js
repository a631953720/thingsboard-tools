const APICaller = require('../../helpers/apiCaller');
const { getTenantJWTToken } = require('../user/getTenantToken');

let token;

async function proxyToTB(config) {
    try {
        token = token || await getTenantJWTToken();
        const _config = {
            ...config,
            headers: {
                ...config.headers,
                'X-Authorization': 'Bearer ' + token,
            }
        }

        return APICaller(_config);
    } catch (error) {
        console.error('Proxy to TB error:',error);
    }
}

module.exports = {
    proxyToTB
};
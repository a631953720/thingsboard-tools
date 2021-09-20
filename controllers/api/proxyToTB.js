const APICaller = require('../../helpers/apiCaller');
const { getTenantJWTToken } = require('../user/getTenantToken');

let token;

async function tryGetTokenAndResendRequest(config) {
    token = await getTenantJWTToken();

    return APICaller({
        ...config,
        headers: {
            ...config.headers,
            'X-Authorization': 'Bearer ' + token,
        }
    });
}

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
        // 執行時間過長會出現token失效
        const response = await APICaller(_config);

        if (response.status === 401) return tryGetTokenAndResendRequest(_config);

        return response;

    } catch (error) {
        console.error('Proxy to TB error:', error);
    }
}

module.exports = {
    proxyToTB
};
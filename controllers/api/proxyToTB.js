const APICaller = require('../../helpers/apiCaller');
const { getTenantJWTToken } = require('../user/getTenantToken');
const { defaultError } = require('../../constant/defaultError');

let token;

// add error handler

async function tryGetTokenAndResendRequest(config) {
    token = await getTenantJWTToken();
    // response token or error object.
    return APICaller({
        ...config,
        headers: {
            ...config.headers,
            'X-Authorization': `Bearer ${token}`,
        },
    });
}

async function proxyToTB(config) {
    try {
        token = token || await getTenantJWTToken();
        const newConfig = {
            ...config,
            headers: {
                ...config.headers,
                'X-Authorization': `Bearer ${token}`,
            },
        };
        const response = await APICaller(newConfig);

        // response token or error object.
        if (response.status === 401) return tryGetTokenAndResendRequest(newConfig);

        return response;
    } catch (error) {
        console.error('Proxy to TB error:', error);
        return {
            ...defaultError,
            data: {
                message: 'Proxy to TB error',
            },
        };
    }
}

module.exports = {
    proxyToTB,
};

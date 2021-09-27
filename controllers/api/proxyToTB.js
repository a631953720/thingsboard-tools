const APICaller = require('../../helpers/apiCaller');
const { getTenantJWTToken } = require('../user/getTenantToken');
const { defaultError } = require('../../constant/defaultResponse');

let token;

// add error handler
async function tryGetTokenAndResendRequest(configs) {
    token = await getTenantJWTToken();
    // response token or error object.
    return APICaller({
        ...configs,
        headers: {
            ...configs.headers,
            'X-Authorization': `Bearer ${token}`,
        },
    });
}

/**
 * @typedef {object} defaultError Default error object
 * @property {number} status
 * @property {object} data
 * @property {string} data.message
 */

/**
 * Proxy API request to thingsboard
 * @param {object} configs Http request options
 * @param {string} configs.method
 * @param {string} configs.url
 * @param {object} configs.headers
 * @returns {Promise | defaultError} If request successful return data, else return default error
 */
async function proxyToTB(configs) {
    try {
        token = token || await getTenantJWTToken();
        const newConfig = {
            ...configs,
            headers: {
                ...configs.headers,
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

const APICaller = require('./apiCaller');
const { SERVER } = require('../constant/env');

async function proxyToTB(config) {
    const _config = {
        ...config,
        headers: {
            ...config.headers,
            'X-Authorization': 'Bearer ' + SERVER.token,
        }
    }
    return APICaller(_config);
}

module.exports = proxyToTB;
const APICaller = require('../../helpers/apiCaller');
const {
    loginAdmin,
    getTenantGroupId,
    getTenantId,
    getTenantToken
} = require('./getTenantToken');

let token;

async function getTenantJWTToken() {
    const adminToken = await loginAdmin();
    const tenantGroupId = await getTenantGroupId(adminToken);
    const tenantId = await getTenantId(adminToken, tenantGroupId);
    const tenantToken = await getTenantToken(adminToken, tenantId);

    return tenantToken;
}

async function proxyToTB(config) {
    token = token || await getTenantJWTToken();
    const _config = {
        ...config,
        headers: {
            ...config.headers,
            'X-Authorization': 'Bearer ' + token,
        }
    }

    return APICaller(_config);
}

module.exports = {
    proxyToTB,
    getTenantJWTToken
};
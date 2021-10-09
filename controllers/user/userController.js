const APICaller = require('../../helpers/apiCaller');
const { SERVER } = require('../../constant/env');
const { showDebugLog } = require('../../helpers/showMsgOnLog');
const { jsonStringify } = require('../../helpers/jsonHandler');

const adminAccount = {
    username: 'sysadmin@thingsboard.org',
    password: 'sysadmin',
};

async function loginAdmin() {
    const opt = {
        method: 'post',
        url: `http://${SERVER.host}:${SERVER.port}/api/auth/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: jsonStringify(adminAccount),
    };
    showDebugLog('Login admin', 'Login admin account', adminAccount);
    const response = await APICaller(opt);
    return response.token;
}

async function getTenantGroupId(token) {
    const opt = {
        method: 'get',
        url: `http://${SERVER.host}:${SERVER.port}/api/tenants?pageSize=10&page=0&sortProperty=createdTime&sortOrder=DESC`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
    };
    showDebugLog('Tenant group', 'Get tenant group id');
    const response = await APICaller(opt);
    const tenantGroupId = response.data[0].id.id;
    return tenantGroupId;
}

async function getTenantId(token, tenantGroupId) {
    const opt = {
        method: 'get',
        url: `http://${SERVER.host}:${SERVER.port}/api/tenant/${tenantGroupId}/users?pageSize=10&page=0&sortProperty=createdTime&sortOrder=DESC`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
    };
    showDebugLog('Tenant', 'Get tenant id');
    const response = await APICaller(opt);
    const tenantId = response.data[0].id.id;
    return tenantId;
}

async function getTenantToken(token, tenantId) {
    const opt = {
        method: 'get',
        url: `http://${SERVER.host}:${SERVER.port}/api/user/${tenantId}/token`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
    };
    showDebugLog('Tenant', 'Get tenant token');
    const response = await APICaller(opt);
    return response.token;
}

module.exports = {
    loginAdmin,
    getTenantGroupId,
    getTenantId,
    getTenantToken,
};

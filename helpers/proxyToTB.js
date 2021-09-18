const APICaller = require('./apiCaller');
const { SERVER } = require('../constant/env');
const { saveTenantToken } = require('./saveOutput');

let token;

async function loginAdmin() {
    const opt = {
        method: 'post',
        url: `http://${SERVER.host}:${SERVER.port}/api/auth/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            username: 'sysadmin@thingsboard.org',
            password: 'sysadmin'
        })
    }

    const response = await APICaller(opt);
    return response.token;
}

async function getTenantGroupId(token) {
    const opt = {
        method: 'get',
        url: `http://${SERVER.host}:${SERVER.port}/api/tenants?pageSize=10&page=0&sortProperty=createdTime&sortOrder=DESC`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': 'Bearer ' + token
        }
    }

    const response = await APICaller(opt);
    const tenantGroupId = response.data[0].id.id;
    return tenantGroupId;
    // getTenantList(token, tenantGroupId);
}

async function getTenantId(token, tenantGroupId) {
    const opt = {
        method: 'get',
        url: `http://${SERVER.host}:${SERVER.port}/api/tenant/${tenantGroupId}/users?pageSize=10&page=0&sortProperty=createdTime&sortOrder=DESC`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': 'Bearer ' + token
        }
    }

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
            'X-Authorization': 'Bearer ' + token
        }
    }

    const response = await APICaller(opt);
    return response.token;
}

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
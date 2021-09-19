const APICaller = require('../../helpers/apiCaller');
const { SERVER } = require('../../constant/env');

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

module.exports = {
    loginAdmin,
    getTenantGroupId,
    getTenantId,
    getTenantToken
};
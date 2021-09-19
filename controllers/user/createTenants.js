const APICaller = require('../../helpers/apiCaller');
const { SERVER } = require('../../constant/env');

async function createTenantGroup(adminToken) {
    const opt = {
        method: 'post',
        url: `http://${SERVER.host}:${SERVER.port}/api/tenant`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': 'Bearer ' + adminToken
        },
        data: JSON.stringify({
            title: "test"
        })
    }
    const response = await APICaller(opt);
    const tenantGroupId = response.id.id;

    return tenantGroupId;
}

async function createTenant(token, tenantGroupId) {
    const opt = {
        method: 'post',
        url: `http://${SERVER.host}:${SERVER.port}/api/user?sendActivationMail=false`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': 'Bearer ' + token
        },
        data: JSON.stringify({
            authority: "TENANT_ADMIN",
            email: "test@gmail.com",
            tenantId: {
                entityType: "TENANT",
                id: tenantGroupId
            }
        })
    }
    const response = await APICaller(opt);
    return response.id.id;
}

async function createTenantAccount(adminToken) {
    const tenantGroupId = await createTenantGroup(adminToken);
    const tenantId = await createTenant(adminToken, tenantGroupId);
    
    return tenantId;
}

module.exports = {
    createTenantAccount
}
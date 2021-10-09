const APICaller = require('../../helpers/apiCaller');
const { jsonStringify } = require('../../helpers/jsonHandler');
const { showDebugLog } = require('../../helpers/showMsgOnLog');
const { SERVER } = require('../../constant/env');

const tenantGroupProfile = {
    title: 'test',
};

const getTenantProfile = (tenantGroupId) => ({
    authority: 'TENANT_ADMIN',
    email: 'test@gmail.com',
    tenantId: {
        entityType: 'TENANT',
        id: tenantGroupId,
    },
});

async function createTenantGroup(adminToken) {
    const opt = {
        method: 'post',
        url: `http://${SERVER.host}:${SERVER.port}/api/tenant`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${adminToken}`,
        },
        data: jsonStringify(tenantGroupProfile),
    };
    showDebugLog('Tenant group', 'Create tenant group', tenantGroupProfile);
    const response = await APICaller(opt);
    const tenantGroupId = response.id.id;
    return tenantGroupId;
}

async function createTenant(token, tenantGroupId) {
    const profile = getTenantProfile(tenantGroupId);
    const opt = {
        method: 'post',
        url: `http://${SERVER.host}:${SERVER.port}/api/user?sendActivationMail=false`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
        },
        data: jsonStringify(profile),
    };
    showDebugLog('Tenant', 'Create tenant account', profile);
    const response = await APICaller(opt);
    return response.id.id;
}

async function createTenantAccount(adminToken) {
    const tenantGroupId = await createTenantGroup(adminToken);
    const tenantId = await createTenant(adminToken, tenantGroupId);
    return tenantId;
}

module.exports = {
    createTenantAccount,
};

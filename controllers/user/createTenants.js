const APICaller = require('../../helpers/apiCaller');
const { jsonStringify } = require('../../helpers/jsonHandler');
const { showDebugLog } = require('../../helpers/showMsgOnLog');
const { SERVER } = require('../../constant/env');

const {
    tenantEmail,
    tenantGroupName,
    tenantName,
} = SERVER;

const tenantGroupProfile = {
    title: tenantGroupName,
};

const getTenantProfile = (tenantGroupId) => ({
    authority: 'TENANT_ADMIN',
    email: tenantEmail,
    tenantId: {
        entityType: 'TENANT',
        id: tenantGroupId,
    },
    firstName: 'test',
    lastName: tenantName,
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

module.exports = {
    createTenantGroup,
    createTenant,
};

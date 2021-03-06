const {
    loginAdmin,
    getTenantGroupId,
    getTenantId,
    getTenantToken,
} = require('./userController');
const { showDebugLog, showWarningLog } = require('../../helpers/showMsgOnLog');
const {
    createTenantGroup,
    createTenant,
} = require('./createTenants');

async function getTenantJWTToken() {
    let tenantGroupId;
    let tenantToken;
    const adminToken = await loginAdmin();

    if (!adminToken) return '';

    try {
        showDebugLog('Get tenant JWT token', 'Try to get tenant token...');
        // If tenant group exist, this program will success
        tenantGroupId = await getTenantGroupId(adminToken);
        const tenantId = await getTenantId(adminToken, tenantGroupId);
        tenantToken = await getTenantToken(adminToken, tenantId);
    } catch (error) {
        // When get tenantToken error, try create new tenant.
        showWarningLog('Get tenant JWT token', 'Get tenant token error. Try to create new tenant account!!!');
        showDebugLog('Get tenant JWT token', 'Try to create new tenant account');
        if (!tenantGroupId) tenantGroupId = await createTenantGroup(adminToken);
        const tenantId = await createTenant(adminToken, tenantGroupId);
        tenantToken = await getTenantToken(adminToken, tenantId);
    }
    showDebugLog('Get tenant JWT token', 'Get tenant token success!');
    return tenantToken;
}

module.exports = {
    getTenantJWTToken,
};

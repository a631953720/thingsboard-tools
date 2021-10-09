const {
    loginAdmin,
    getTenantGroupId,
    getTenantId,
    getTenantToken,
} = require('./userController');
const { showDebugLog, showWarningLog } = require('../../helpers/showMsgOnLog');

const { createTenantAccount } = require('./createTenants');

async function getTenantJWTToken() {
    const adminToken = await loginAdmin();
    let tenantToken;
    try {
        showDebugLog('Get tenant JWT token', 'Try to get tenant token...');
        // If tenant group exist, this program will success
        const tenantGroupId = await getTenantGroupId(adminToken);
        const tenantId = await getTenantId(adminToken, tenantGroupId);
        tenantToken = await getTenantToken(adminToken, tenantId);
    } catch (error) {
        // When get tenantToken error, try create new tenant.
        showWarningLog('Get tenant JWT token', 'Get tenant token error. Try to create new tenant account!!!');
        showDebugLog('Get tenant JWT token', 'Get tenant token error...');
        showDebugLog('Get tenant JWT token', 'Try to create new tenant account');
        const tenantId = await createTenantAccount(adminToken);
        tenantToken = await getTenantToken(adminToken, tenantId);
    }
    showDebugLog('Get tenant JWT token', 'Get tenant token success!');
    return tenantToken;
}

module.exports = {
    getTenantJWTToken,
};

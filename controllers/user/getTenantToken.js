const {
    loginAdmin,
    getTenantGroupId,
    getTenantId,
    getTenantToken
} = require('./userController');
const { showLog } = require('../../helpers/showMsgOnLog');

const { createTenantAccount } = require('./createTenants');

async function getTenantJWTToken() {
    const adminToken = await loginAdmin();
    let tenantToken;
    try {
        showLog('Try to get tenant token...');
        // If tenant group exist, this program will success
        const tenantGroupId = await getTenantGroupId(adminToken);
        const tenantId = await getTenantId(adminToken, tenantGroupId);
        tenantToken = await getTenantToken(adminToken, tenantId);
    } catch (error) {
        // When get tenantToken error, try create new tenant.
        showLog('Get tenant token error...');
        showLog('Try to create new tenant account');
        const tenantId = await createTenantAccount(adminToken);
        tenantToken = await getTenantToken(adminToken, tenantId);
    }
    showLog('Get tenant token success!');
    return tenantToken;
}

module.exports = {
    getTenantJWTToken
};
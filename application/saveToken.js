const { getTenantJWTToken } = require('../controllers/user/proxyToTB');
const { saveTenantToken } = require('../helpers/saveOutput');

async function saveTokenToFile() {
    const token = await getTenantJWTToken();
    saveTenantToken(token);
}

saveTokenToFile();
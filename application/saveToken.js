const { getTenantJWTToken } = require('../controllers/user/getTenantToken');
const { saveTenantToken } = require('../helpers/saveOutput');

async function saveTokenToFile() {
    const token = await getTenantJWTToken();
    if (token) {
        saveTenantToken(token);
    }
}

saveTokenToFile();

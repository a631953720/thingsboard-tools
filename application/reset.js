const { showLog } = require('../helpers/showMsgOnLog');
const deleteAllDevice = require('../controllers/devices/deleteAllDevice');

try {
    showLog('delete all devices...');
    deleteAllDevice();
} catch (error) {
    console.error('deleteAllDevice error', error);
}
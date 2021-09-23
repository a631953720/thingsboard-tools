const { showLog } = require('../helpers/showMsgOnLog');
const deleteAllDevice = require('../controllers/devices/deleteAllDevice');

async function deleteTBDevice() {
    showLog('delete all devices...');
    await deleteAllDevice();
    showLog('done');
}
    
deleteTBDevice()
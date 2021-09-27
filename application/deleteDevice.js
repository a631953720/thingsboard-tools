const { showLog } = require('../helpers/showMsgOnLog');
const deleteAllDevice = require('../controllers/devices/deleteAllDevice');

async function deleteTBDevice() {
    showLog('Delete all devices...');

    const response = await deleteAllDevice();

    if (response.status >= 400) {
        showLog('Delete all devices error');
    } else {
        showLog('Done');
    }
}

deleteTBDevice();

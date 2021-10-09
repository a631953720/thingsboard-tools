const { showSimpleMessage } = require('../helpers/showMsgOnLog');
const deleteAllDevice = require('../controllers/devices/deleteAllDevice');

async function deleteTBDevice() {
    showSimpleMessage('Delete all devices...');

    const response = await deleteAllDevice();

    if (response.status >= 400) {
        showSimpleMessage('Delete all devices error');
    } else {
        showSimpleMessage('Done');
    }
}

deleteTBDevice();

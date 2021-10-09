const addDevices = require('../controllers/devices/addDevice');
const saveDeviceListToJsonFile = require('../controllers/devices/saveDeviceToJson');
const { showSimpleMessage } = require('../helpers/showMsgOnLog');

async function initTBDevices() {
    showSimpleMessage('Add devices...');

    const deviceList = await addDevices();

    if (deviceList.length > 0) {
        await saveDeviceListToJsonFile(deviceList);
        showSimpleMessage('Done');
    } else {
        showSimpleMessage('Add devices error');
    }
}

initTBDevices();

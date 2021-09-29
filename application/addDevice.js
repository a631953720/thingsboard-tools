const addDevices = require('../controllers/devices/addDevice');
const saveDeviceListToJsonFile = require('../controllers/devices/saveDeviceToJson');
const { showLog } = require('../helpers/showMsgOnLog');

async function initTBDevices() {
    showLog('Add devices...');

    const deviceList = await addDevices();

    if (deviceList.length > 0) {
        await saveDeviceListToJsonFile(deviceList);
        showLog('Done');
    } else {
        showLog('Add devices error');
    }
}

initTBDevices();

const addDevices = require('../controllers/devices/addDevice');
const getDeviceTokenList = require('../controllers/devices/getDeviceTokenList');
const showLog = require('../helpers/showMsgOnLog');
const fs = require('fs');
const { FILE } = require('../constant/env');

async function initTBDevices() {
    showLog('add devices...');

    const jsonPath = FILE.deviceJsonPath;
    const deviceList = await getDeviceTokenList(await addDevices());
    const data = JSON.stringify(deviceList);

    showLog('output json file');

    fs.writeFileSync(jsonPath, data, (err) => {
        console.error('Data written to file error', err);
    });
    
    showLog('done');
}

initTBDevices();
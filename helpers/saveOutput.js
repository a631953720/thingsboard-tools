const fs = require('fs');
const { FILE, DEVICE } = require('../constant/env');
const showLog = require('../helpers/showMsgOnLog');

function Counter(count) {
    showLog('Save output...');

    const jsonPath = FILE.LogFilePath;
    const deviceList = DEVICE.deviceList;
    const data = JSON.stringify({
        deviceNameList: deviceList.map(device=>device.name),
        testCount: count
    });

    fs.writeFileSync(jsonPath, data, (err) => {
        console.error('Data written to file error', err);
    });
}

module.exports = Counter;
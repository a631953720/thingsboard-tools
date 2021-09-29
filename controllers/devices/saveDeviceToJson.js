const fs = require('fs');

const { showLog } = require('../../helpers/showMsgOnLog');
const { jsonStringify } = require('../../helpers/jsonHandler');
const { FILE } = require('../../constant/env');

async function saveDeviceListToJsonFile(deviceList) {
    const jsonPath = FILE.deviceJsonPath;

    if (Array.isArray(deviceList)) {
        if (deviceList.length < 1) {
            showLog('Add devices error');
            return;
        }

        showLog('Output json file');

        fs.writeFileSync(jsonPath, jsonStringify(deviceList), (err) => {
            console.error('Data written to file error', err);
        });
    }
}

module.exports = saveDeviceListToJsonFile;

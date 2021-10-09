const fs = require('fs');
const { showSimpleMessage, showError, showDebugLog } = require('../../helpers/showMsgOnLog');
const { jsonStringify } = require('../../helpers/jsonHandler');
const { FILE } = require('../../constant/env');

async function saveDeviceListToJsonFile(deviceList) {
    const jsonPath = FILE.deviceJsonPath;
    showDebugLog('Device', 'Output device list json file', FILE.deviceJsonPath);
    if (Array.isArray(deviceList)) {
        if (deviceList.length < 1) {
            showSimpleMessage('Add devices error');
            return;
        }

        showSimpleMessage('Output json file');

        fs.writeFileSync(jsonPath, jsonStringify(deviceList), (err) => {
            showError('Data written to file error', err);
        });
    }
}

module.exports = saveDeviceListToJsonFile;

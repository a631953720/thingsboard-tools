const fs = require('fs');
const { showSimpleMessage } = require('../helpers/showMsgOnLog');
const { jsonStringify } = require('../helpers/jsonHandler');
const { FILE } = require('../constant/env');

const defaultDevice = {
    name: 'TB device name',
    id: 'TB device id',
    token: 'TB device access token',
};

try {
    const { configDeviceFilePath, deviceJsonPath } = FILE;
    if (fs.existsSync(configDeviceFilePath)) {
        showSimpleMessage('Device config file exist!');
    } else {
        showSimpleMessage('Device config file not exist...');
        showSimpleMessage('Try to create sample device config file.');
        fs.writeFileSync(configDeviceFilePath, jsonStringify(defaultDevice));
        fs.writeFileSync(deviceJsonPath, jsonStringify([]));
    }
} catch (error) {
    showSimpleMessage('device config file error', error);
}

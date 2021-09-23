const fs = require('fs');

const { FILE } = require('../constant/env');

const defaultDevice = {
    name: 'TB device name',
    id: 'TB device id',
    token: 'TB device access token',
};

try {
    const { configDeviceFilePath } = FILE;
    if (fs.existsSync(configDeviceFilePath)) {
        console.log('Device config file exist!');
    } else {
        console.log('Device config file not exist...');
        console.log('Try to create sample device config file.');
        fs.writeFileSync(configDeviceFilePath, JSON.stringify(defaultDevice));
    }
} catch (error) {
    console.log('device config file error', error);
}

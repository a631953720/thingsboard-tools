const { proxyToTB } = require('../api/proxyToTB');
const { SERVER, DEVICE } = require('../../constant/env');
const getDeviceTokenList = require('./getDeviceTokenList');
const { showDebugLog } = require('../../helpers/showMsgOnLog');
const { jsonStringify } = require('../../helpers/jsonHandler');

const opt = {
    method: 'post',
    url: `http://${SERVER.host}:${SERVER.port}/api/device`,
    headers: {
        'Content-Type': 'application/json',
    },
};

async function addDevicesAndGetDeviceList() {
    const deviceIdList = [];
    const {
        numberOfDevices,
        deviceName,
        deviceType,
        deviceLabel,
    } = DEVICE;
    showDebugLog('Device', 'Add device to TB', DEVICE);
    for (let i = 0; i < numberOfDevices; i += 1) {
        const deviceProfile = {
            name: `${deviceName}-${i}`,
            type: deviceType,
            label: deviceLabel,
        };

        // eslint-disable-next-line no-await-in-loop
        const response = await proxyToTB({
            ...opt,
            data: jsonStringify(deviceProfile),
        });

        if (response.status >= 400) {
            return [];
        }

        deviceIdList.push({
            name: response.name,
            id: response.id.id,
        });
    }
    return deviceIdList;
}

async function getAllDeviceAccessTokenList() {
    showDebugLog('Device', 'Try to get all device token');
    const deviceList = await addDevicesAndGetDeviceList();
    return getDeviceTokenList(deviceList);
}

module.exports = getAllDeviceAccessTokenList;

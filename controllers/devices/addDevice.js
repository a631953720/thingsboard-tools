const { proxyToTB } = require('../api/proxyToTB');
const { SERVER, DEVICE } = require('../../constant/env');

const opt = {
    method: 'post',
    url: `http://${SERVER.host}:${SERVER.port}/api/device`,
    headers: {
        'Content-Type': 'application/json',
    },
};

async function addDevices() {
    const deviceIdList = [];
    const {
        numberOfDevices,
        deviceName,
        deviceType,
        deviceLabel,
    } = DEVICE;
    for (let i = 0; i < numberOfDevices; i += 1) {
        const deviceProfile = {
            name: `${deviceName}-${i}`,
            type: deviceType,
            label: deviceLabel,
        };

        // eslint-disable-next-line no-await-in-loop
        const response = await proxyToTB({
            ...opt,
            data: JSON.stringify(deviceProfile),
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

module.exports = addDevices;

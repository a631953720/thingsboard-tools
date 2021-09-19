const { proxyToTB } = require('../user/proxyToTB');
const { SERVER, DEVICE } = require('../../constant/env');

const opt = {
    method: 'post',
    url: `http://${SERVER.host}:${SERVER.port}/api/device`,
    headers: {
        'Content-Type': 'application/json'
    }
}

async function addDevices() {
    const deviceIdList = [];
    const { numberOfDevices, deviceName, deviceType, deviceLabel } = DEVICE;
    try {
        for (let i = 0; i < numberOfDevices; i++) {
            const deviceProfile = {
                name: `${deviceName}-${i}`,
                type: deviceType,
                label: deviceLabel
            };

            const res = await proxyToTB({
                ...opt,
                data: JSON.stringify(deviceProfile)
            });

            deviceIdList.push({
                name: res.name,
                id: res.id.id
            });
        }
        return deviceIdList;
    } catch (error) {
        console.error("[add Devices Error]", error);
    }
}

module.exports = addDevices;
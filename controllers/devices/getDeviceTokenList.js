const { proxyToTB } = require('../api/proxyToTB');
const { SERVER } = require('../../constant/env');

async function getDeviceToken(deviceId) {
    const opt = {
        method: 'get',
        url: `http://${SERVER.host}:${SERVER.port}/api/device/${deviceId}/credentials`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await proxyToTB(opt);
    // 取得device token錯誤會有裝置留存在TB
    if (response.status >= 400) {
        return '';
    }

    return response.credentialsId;
}

async function getDeviceTokenList(deviceList) {
    const deviceTokenList = [];

    if (!Array.isArray(deviceList)) return [];

    for (let i = 0; i < deviceList.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const token = await getDeviceToken(deviceList[i].id);

        if (!token) return [];

        deviceTokenList.push({
            name: deviceList[i].name,
            id: deviceList[i].id,
            token,
        });
    }

    return deviceTokenList;
}

module.exports = getDeviceTokenList;

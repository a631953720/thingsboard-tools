const { proxyToTB } = require('../api/proxyToTB');
const { SERVER } = require('../../constant/env');
const deviceList = require('../../output/deviceList.json');
const { defaultSuccess } = require('../../constant/defaultResponse');

async function deleteAllDevice() {
    // 要處理檔案不存在的問題，可能從init下手

    if (!Array.isArray(deviceList)) throw new Error('device is not array');

    for (let i = 0; i < deviceList.length; i += 1) {
        const opt = {
            method: 'delete',
            url: `http://${SERVER.host}:${SERVER.port}/api/device/${deviceList[i].id}`,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // eslint-disable-next-line no-await-in-loop
        const response = await proxyToTB(opt);
        if (response.status >= 400) {
            return response;
        }
    }
    return defaultSuccess;
}

module.exports = deleteAllDevice;

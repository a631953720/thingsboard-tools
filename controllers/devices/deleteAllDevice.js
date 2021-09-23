const { proxyToTB } = require('../api/proxyToTB');
const { SERVER, DEVICE } = require('../../constant/env');

async function deleteAllDevice() {
    try {
        // 要處理檔案不存在的問題，可能從init下手
        const deviceList = require(`../../output/${DEVICE.deviceListFileName}`);

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
            await proxyToTB(opt);
        }
    } catch (error) {
        console.error('[Delete devices error]', error);
    }
}

module.exports = deleteAllDevice;

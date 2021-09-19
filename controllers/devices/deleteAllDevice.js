const { proxyToTB } = require('../user/proxyToTB');
const { SERVER, DEVICE } = require('../../constant/env');

async function deleteAllDevice() {
    const deviceList = require(`../../output/${DEVICE.deviceListFileName}`);

    if (!Array.isArray(deviceList)) throw new Error('device is not array');

    for (let i = 0; i < deviceList.length; i++) {
        try {
            const opt = {
                method: 'delete',
                url: `http://${SERVER.host}:${SERVER.port}/api/device/${deviceList[i].id}`,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            await proxyToTB(opt);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = deleteAllDevice;

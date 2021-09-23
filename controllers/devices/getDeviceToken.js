const { proxyToTB } = require('../api/proxyToTB');
const { SERVER } = require('../../constant/env');

async function getDeviceToken(deviceId) {
    try {
        const opt = {
            method: 'get',
            url: `http://${SERVER.host}:${SERVER.port}/api/device/${deviceId}/credentials`,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await proxyToTB(opt);
        return res['credentialsId'];
    } catch (error) {
        console.error("[Get device token error]", error);
        return error;
    }
}

module.exports = getDeviceToken;
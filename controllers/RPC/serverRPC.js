const { proxyToTB } = require('../../helpers/proxyToTB');
const { SERVER, DEVICE } = require('../../constant/env');

/**
 * 
 * @param {object} config 
 * @param {string} config.deviceId TB device id
 * @param {string} config.method RPC method
 * @param {any} config.params RPC payload
 */

async function serverTwoWayRPC(config) {
    try {
        const { deviceId, method, params } = config;
        const opt = {
            method: 'post',
            url: `http://${SERVER.host}:${SERVER.port}/api/plugins/rpc/twoway/${deviceId}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                method: method,
                params: params
            })
        }

        const res = await proxyToTB({ ...opt });

        if (res.status >= 400) {
            console.log(res.status, 123);
            console.log(res.data, 123);
        } else {
            console.log(res);
        }

    } catch (error) {
        console.error("[RPC Error]", error);
    }
}

module.exports = {
    serverTwoWayRPC
};
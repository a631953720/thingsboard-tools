const { proxyToTB } = require('../api/proxyToTB');
const { SERVER,FILE } = require('../../constant/env');
const { saveServerTwoWayRPCToDevice } = require('../../helpers/saveOutput');
const { showLog } = require('../../helpers/showMsgOnLog');

const messageList = {
    error: [],
    success: []
};

function saveRPCLog(config) {
    const { isError, messageList } = config;
    const isSaveLog= FILE.isSaveLog;

    if(isSaveLog) {
        saveServerTwoWayRPCToDevice({
            isError,
            messageList: messageList
        });
    }
}

/**
 * 
 * @param {object} config 
 * @param {string} config.deviceId TB device id
 * @param {string} config.method RPC method
 * @param {any} config.params RPC payload
 */

async function serverTwoWayRPCToDevice(config) {
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
                params: params,
                timeout: 30000
            })
        }

        const res = await proxyToTB({ ...opt });

        if (res.status >= 400) {
            showLog('RPC error...');
            messageList.error.push({ message: res.data });
            saveRPCLog({
                isError: true,
                messageList: messageList.error
            });

        } else {
            showLog('RPC success!');
            messageList.success.push({ message: res });
            saveRPCLog({
                isError: false,
                messageList: messageList.success
            });
        }

    } catch (error) {
        console.error("[RPC Error]", error);
    }
}

module.exports = {
    serverTwoWayRPCToDevice
};
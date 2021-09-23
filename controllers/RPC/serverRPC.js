const { proxyToTB } = require('../api/proxyToTB');
const { SERVER, FILE } = require('../../constant/env');
const { saveServerTwoWayRPCToDevice } = require('../../helpers/saveOutput');
const { showLog } = require('../../helpers/showMsgOnLog');

const globalMessageList = {
    error: [],
    success: [],
};

function saveRPCLog(config) {
    const { isError, messageList } = config;
    const { isSaveLog } = FILE;

    if (isSaveLog) {
        saveServerTwoWayRPCToDevice({
            isError,
            messageList,
        });
    }
}

/**
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
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                method,
                params,
                timeout: 30000,
            }),
        };

        const res = await proxyToTB({ ...opt });

        if (res.status >= 400) {
            showLog('RPC error...');
            globalMessageList.error.push({ message: res.data });
            saveRPCLog({
                isError: true,
                messageList: globalMessageList.error,
            });
        } else {
            showLog('RPC success!');
            globalMessageList.success.push({ message: res });
            saveRPCLog({
                isError: false,
                messageList: globalMessageList.success,
            });
        }
    } catch (error) {
        console.error('[RPC Error]', error);
    }
}

module.exports = {
    serverTwoWayRPCToDevice,
};

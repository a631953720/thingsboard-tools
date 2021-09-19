const fs = require('fs');
const { FILE, DEVICE } = require('../constant/env');
const { showLog } = require('../helpers/showMsgOnLog');

function saveTestInformation(count) {
    showLog('Save output...');

    const deviceList = require(`../output/${DEVICE.deviceListFileName}`);
    const jsonPath = FILE.logFilePath;
    const data = JSON.stringify({
        deviceCount: deviceList.length,
        testCount: count,
        updateTime: new Date().toLocaleString()
    });

    fs.writeFileSync(jsonPath, data, (err) => {
        console.error('Data written to file error', err);
    });
}

function saveErrorDeviceList(errorDeviceList) {
    showLog('Save error device list...');

    const jsonPath = FILE.errorLogFilePath;
    const data = JSON.stringify({
        ...errorDeviceList,
        updateTime: new Date().toLocaleString()
    });

    fs.writeFileSync(jsonPath, data, (err) => {
        console.error('Data written to file error', err);
    });
}

function saveVirtualDeviceReceiveRPC(RPCMessageList) {
    showLog('Save RPC message...');

    const jsonPath = FILE.RPCMessageLogFilePath;
    const data = JSON.stringify({
        ...RPCMessageList,
        updateTime: new Date().toLocaleString()
    });

    fs.writeFileSync(jsonPath, data, (err) => {
        console.error('Data written to file error', err);
    });
}

function saveTenantToken(token) {
    showLog('Save token');

    const filePath = FILE.JSWTokenFilePath;

    fs.writeFileSync(filePath, `Bearer ${token}`, (err) => {
        console.error('Data written to file error', err);
    });
}

module.exports = {
    saveTestInformation,
    saveErrorDeviceList,
    saveVirtualDeviceReceiveRPC,
    saveTenantToken
};
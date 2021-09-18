const fs = require('fs');
const { FILE, DEVICE } = require('../constant/env');
const { showLog } = require('../helpers/showMsgOnLog');
const deviceList = require(`../output/${DEVICE.deviceListFileName}`);

function saveTestInformation(count) {
    showLog('Save output...');

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

function saveRPCMessage(RPCMessageList) {
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

module.exports = {
    saveTestInformation,
    saveErrorDeviceList,
    saveRPCMessage
};
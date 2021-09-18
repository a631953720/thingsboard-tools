const { pathToFileURL } = require('url');

require('dotenv').config();

const deviceListFileName = 'deviceList.json';
const LogFileName = `mockData/MockDataInfo${Date.now()}.json`;
const ErrorLogFileName = `error/ErrorLog${Date.now()}.json`;
const RPCMessageLogFileName = `RPC/RPCMessageLog${Date.now()}.json`

module.exports = {
    SERVER: {
        host: process.env.HOST || '127.0.0.1',
        port: process.env.PORT || '80'
    },
    DEVICE: {
        deviceType: process.env.DEVICE_TYPE || 'default',
        deviceLabel: process.env.DEVICE_LABEL || '',
        numberOfDevices: process.env.NUMBER_OF_DEVICES || 1,
        deviceListFileName: deviceListFileName,
        isSendMockData: process.env.SEND_MOCK_DATA || true
    },
    FILE: {
        deviceJsonPath: pathToFileURL(__dirname + `/../output/${deviceListFileName}`),
        logFilePath: pathToFileURL(__dirname + `/../output/${LogFileName}`),
        errorLogFilePath: pathToFileURL(__dirname + `/../output/${ErrorLogFileName}`),
        RPCMessageLogFilePath: pathToFileURL(__dirname + `/../output/${RPCMessageLogFileName}`),
        saveOutputFrequency: process.env.SAVE_OUTPUT_FREQUENCY,
        isSaveLog: process.env.SAVE_LOG || true
    },
    MQTT: {
        publish_frequency: process.env.PUBLISH_FREQUENCY || "10",
        port: process.env.MQTT_PORT || "1883",
        testTime: process.env.TEST_TIME || 0,
        isSubscribeRPC: process.env.SUBSCRIBE_RPC || false
    },
    BUFFER: {
        connectDelay: process.env.CONNECT_DELAY || 5
    }
}
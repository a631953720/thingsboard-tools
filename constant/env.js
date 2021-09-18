const { pathToFileURL } = require('url');

require('dotenv').config();

const deviceListFileName = 'deviceList.json';

module.exports = {
    SERVER: {
        host: process.env.HOST || '127.0.0.1',
        port: process.env.PORT || '80',
        token: process.env.JWT_TOKEN
    },
    DEVICE: {
        deviceList: require('../output/deviceList.json'),
        deviceType: process.env.DEVICE_TYPE || 'default',
        deviceLabel: process.env.DEVICE_LABEL || '',
        numberOfDevices: process.env.NUMBER_OF_DEVICES || 1,
        deviceListFileName: deviceListFileName,
    },
    FILE: {
        deviceJsonPath: pathToFileURL(__dirname + `/../output/${deviceListFileName}`),
        jsonPath: pathToFileURL(__dirname + `/../output/${deviceListFileName}`),
    },
    MQTT: {
        publish_frequency: process.env.PUBLISH_FREQUENCY || "10",
        port: process.env.MQTT_PORT || "1883",
        testTime: process.env.TEST_TIME || 0,
    }
}
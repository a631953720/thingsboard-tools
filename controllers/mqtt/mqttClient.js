const { DEVICE, MQTT, FILE, BUFFER } = require('../../constant/env');
const { rawData } = require('../../helpers/mockData');
const { initConnect } = require('./mqttConnector');
const { saveTestInformation } = require('../../helpers/saveOutput');
const { showLog } = require('../../helpers/showMsgOnLog');
const { telemetryTopic } = require('../../constant/mqttTopic');
const deviceList = require(`../../output/${DEVICE.deviceListFileName}`);

const timeArr = [];
const saveOutputFrequency = Number(FILE.saveOutputFrequency) * 1000;
const connectDelay = Number(BUFFER.connectDelay);
const testTime = Number(MQTT.testTime);

function publishData(config) {
    const { client, device, frequency, idx } = config;

    const timeId = setInterval(() => {
        const data = JSON.stringify(rawData());

        client.publish(telemetryTopic, data, () => {
            showLog(`${device.name} send data`);
            timeArr[idx] += 1;
        });

        if (timeArr[idx] >= testTime && testTime !== 0) {
            clearInterval(timeId);
            showLog('test end');
        }

        if (client.disconnected) clearInterval(timeId);

    }, frequency);
}

function connectToTB(config) {
    const { device, deviceListLength } = config;
    const client = initConnect(device);

    setTimeout(() => {
        publishData({ ...config, client: client });
    }, (connectDelay * deviceListLength));
}

function MQTTConnecter(frequency) {
    const deviceListLength = deviceList.length;

    deviceList.forEach((device, idx) => {
        const config = {
            device: device,
            frequency: frequency,
            idx: idx,
            deviceListLength: deviceListLength
        };

        timeArr[idx] = 0;

        // Set timeout to avoid all device connect at the same time.
        setTimeout(() => {
            connectToTB(config);
        }, connectDelay * (idx + 1));
    });
}

// Save total publish data times to json file every some seconds.
setInterval(() => {
    const totalTimes = timeArr.reduce((accu, curr) => accu + curr);
    saveTestInformation(totalTimes);
}, saveOutputFrequency);

module.exports = MQTTConnecter;
const { DEVICE, MQTT, FILE } = require('../../constant/env');
const { rawData } = require('../../helpers/mockData');
const { initConnect } = require('./mqttConnector');
const saveOutput = require('../../helpers/saveOutput');
const topic = require('../../constant/mqttTopic');

const timeArr = [];
const saveOutputFrequency = FILE.saveOutputFrequency * 1000;

function publishData(frequency) {
    const deviceList = DEVICE.deviceList;
    const testTime = MQTT.testTime;

    deviceList.forEach((device, idx) => {
        console.log("device info: ", device);
        timeArr[idx] = 0;
        const client = initConnect(device);

        const timeId = setInterval(() => {
            const data = JSON.stringify(rawData());

            client.publish(topic, data, () => {
                console.log('send data success');
            })

            console.log(`${device.name} connected`, timeArr[idx] += 1);
            if (timeArr[idx] >= testTime && +testTime !== 0) {
                clearInterval(timeId);
                console.log('test end');
            }

            if (client.disconnected) clearInterval(timeId);
            if (idx === timeArr.length - 1) {
                const totalTimes = timeArr.reduce((accu, curr) => accu + curr);
                console.log('total', totalTimes);
            }
        }, frequency);
    });
}

// Save total publish data times to json file every some seconds.
setInterval(() => {
    saveOutput(timeArr.reduce((accu, curr) => accu + curr));
}, saveOutputFrequency);

module.exports = publishData;
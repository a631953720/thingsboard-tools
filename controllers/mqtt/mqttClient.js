const {
    DEVICE,
    MQTT
} = require('../../constant/env');

const {
    rawData
} = require('../../helpers/mockData');

const {
    initConnect
} = require('./mqttConnector');

const topic = require('../../constant/mqttTopic');

const timeArr = [];

function publishData(frequency) {
    const deviceList = DEVICE.deviceList;
    const testTime = MQTT.testTime;
    
    deviceList.forEach((device, idx) => {
        console.log("device info: ", device);
        timeArr[idx] = 0;
        const client = initConnect(device);

        const timeId = setInterval(() => {
            client.publish(topic, JSON.stringify(rawData()), (e) => {
                console.log('send data success');
            })

            console.log(`${device.name} connected`, timeArr[idx] += 1);
            if (timeArr[idx] >= testTime && +testTime !== 0) {
                clearInterval(timeId);
                console.log('test end');
            }

            if (client.disconnected) clearInterval(timeId);
            if (idx === timeArr.length - 1) console.log('total', timeArr.reduce((accu, curr) => accu + curr));
        }, frequency * 1000);
    });
}

module.exports = publishData;
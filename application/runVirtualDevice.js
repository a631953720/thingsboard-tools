const { MQTT } = require('../constant/env');
const { MQTTConnecter, publishData } = require('../controllers/mqtt/mqttClient');

async function runTest() {
    MQTTConnecter({
        frequency: MQTT.publish_frequency * 1000,
        isSendData: false,
        isSubscribeRPC: true
    });
}

runTest();
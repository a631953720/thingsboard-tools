const { MQTT, DEVICE } = require('../constant/env');
const { MQTTConnecter } = require('../controllers/mqtt/mqttClient');

async function runTest() {
    const isSendData = Boolean(DEVICE.isSendMockData);
    const isSubscribeRPC = Boolean(MQTT.isSubscribeRPC);
    MQTTConnecter({
        frequency: MQTT.publish_frequency * 1000,
        isSendData,
        isSubscribeRPC
    });
}

runTest();
const { MQTT } = require('../constant/env');
const runTest = require('../controllers/mqtt/mqttClient');

runTest(MQTT.publish_frequency * 1000);
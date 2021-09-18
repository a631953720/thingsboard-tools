const { MQTT } = require('../constant/env');
const publishData = require('../controllers/mqtt/mqttClient');

publishData(MQTT.publish_frequency * 1000);
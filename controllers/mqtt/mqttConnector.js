const mqtt = require('mqtt')
const {
    SERVER,
    MQTT
} = require('../../constant/env');

function initConnect(device) {
    const client = mqtt.connect(`mqtt://${SERVER.host}:${MQTT.port}`, {
        username: device.token
    });

    client.once("error", function (error) {
        console.log("Can't connect: " + error);
        client.end();
    });

    return client;
}

module.exports = {
    initConnect
}
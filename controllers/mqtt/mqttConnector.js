const mqtt = require('mqtt')
const { SERVER, MQTT } = require('../../constant/env');
const { saveErrorDeviceList } = require('../../helpers/saveOutput');

const errorDeviceList = [];

function initConnect(device) {
    const client = mqtt.connect(`mqtt://${SERVER.host}:${MQTT.port}`, {
        username: device.token
    });
    
    client.once("connect", ()=>{
        console.log(device.name, 'connected');
    });

    client.once("error", (error) => {
        console.log(`${device.name} can't connect: ` + error);
        errorDeviceList.push({
            device: device.name,
        });
        client.end();
    });

    return client;
}

setInterval(() => {
    saveErrorDeviceList(errorDeviceList);
}, 30 * 1000)

module.exports = {
    initConnect
}
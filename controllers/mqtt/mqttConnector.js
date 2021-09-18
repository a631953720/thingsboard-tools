const mqtt = require('mqtt')
const { showLog, showError } = require('../../helpers/showMsgOnLog');
const { SERVER, MQTT, FILE } = require('../../constant/env');
const { saveErrorDeviceList } = require('../../helpers/saveOutput');

const errorDeviceList = [];
const saveOutputFrequency = Number(FILE.saveOutputFrequency) * 1000;

function initConnect(device) {
    const client = mqtt.connect(`mqtt://${SERVER.host}:${MQTT.port}`, {
        username: device.token
    });
    
    client.once("connect", ()=>{
        showLog(`${device.name} connected`);
    });

    client.once("error", (error) => {
        showError(`${device.name} can't connect: ${error}`);
        errorDeviceList.push({
            device: device.name,
            message: error
        });
        client.end();
    });

    return client;
}

setInterval(() => {
    saveErrorDeviceList(errorDeviceList);
}, saveOutputFrequency)

module.exports = {
    initConnect
}
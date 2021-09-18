const mqtt = require('mqtt');
const { showLog, showError } = require('../../helpers/showMsgOnLog');
const { SERVER, MQTT, FILE } = require('../../constant/env');
const { saveErrorDeviceList, saveRPCMessage } = require('../../helpers/saveOutput');
const { serverRPCTopic, responseRPCTopic } = require('../../constant/mqttTopic');

const RPCMessageList = [];
const errorDeviceList = [];
const saveOutputFrequency = Number(FILE.saveOutputFrequency) * 1000;
const isSaveLog = Boolean(FILE.isSaveLog);

function initConnect(device) {
    const client = mqtt.connect(`mqtt://${SERVER.host}:${MQTT.port}`, {
        username: device.token
    });

    client.once("connect", () => {
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

function subscribeRPC(client) {

    client.subscribe(serverRPCTopic);

    client.on('message', (topic, message) => {
        console.log('request.topic: ', topic);
        console.log('request.body: ', JSON.parse(message));
        
        const serverRPCMessage = JSON.parse(message);
        const requestId = topic.slice('v1/devices/me/rpc/request/'.length);
        const responsePayload = JSON.stringify({
            method: serverRPCMessage.method,
            params: {
                ...serverRPCMessage.params,
                isDone: true
            }
        });

        // client acts as an echo service
        client.publish(responseRPCTopic + requestId, responsePayload);

        RPCMessageList.push({
            topic:topic,
            serverRPCMessage: message.toString()
        });
    });
}

// 可以不用每次都開著
if (isSaveLog){
    setInterval(() => {
        saveErrorDeviceList(errorDeviceList);
        saveRPCMessage(RPCMessageList)
    }, saveOutputFrequency);
}

module.exports = {
    initConnect,
    subscribeRPC
}
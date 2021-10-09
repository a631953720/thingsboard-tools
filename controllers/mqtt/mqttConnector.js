const mqtt = require('mqtt');
const { showSimpleMessage } = require('../../helpers/showMsgOnLog');
const { SERVER, MQTT, FILE } = require('../../constant/env');
const { saveErrorDeviceList, saveVirtualDeviceReceiveRPC } = require('../../helpers/saveOutput');
const { serverRPCTopic, responseRPCTopic } = require('../../constant/mqttTopic');
const { jsonStringify, jsonParse } = require('../../helpers/jsonHandler');

const RPCMessageList = [];
const errorDeviceList = [];
const saveOutputFrequency = Number(FILE.saveOutputFrequency) * 1000;
const isSaveLog = Boolean(FILE.isSaveLog);

function initConnect(device) {
    const client = mqtt.connect(`mqtt://${SERVER.host}:${MQTT.port}`, {
        username: device.token,
    });

    client.once('connect', () => {
        showSimpleMessage(`${device.name} connected`);
    });

    client.once('error', (error) => {
        showSimpleMessage(`${device.name} can't connect: ${error}`);
        errorDeviceList.push({
            device: device.name,
            message: error,
        });
        client.end();
    });

    return client;
}

function subscribeRPC(client) {
    client.subscribe(serverRPCTopic);

    client.on('message', (topic, message) => {
        showSimpleMessage(`request.topic: ${topic}`);
        showSimpleMessage('request.body: ', jsonParse(message));

        const serverRPCMessage = jsonParse(message);
        const requestId = topic.slice('v1/devices/me/rpc/request/'.length);
        const responsePayload = jsonStringify({
            method: serverRPCMessage.method,
            params: {
                ...serverRPCMessage.params,
                isDone: true,
            },
        });

        // client acts as an echo service
        client.publish(responseRPCTopic + requestId, responsePayload);

        RPCMessageList.push({
            topic,
            serverRPCMessage: message.toString(),
        });
    });
}

// 可以不用每次都開著
if (isSaveLog) {
    setInterval(() => {
        saveErrorDeviceList(errorDeviceList);
        saveVirtualDeviceReceiveRPC(RPCMessageList);
    }, saveOutputFrequency);
}

module.exports = {
    initConnect,
    subscribeRPC,
};

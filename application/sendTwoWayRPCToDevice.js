const { serverTwoWayRPCToDevice } = require('../controllers/RPC/serverRPC');
const device = require('../config/device.json');

async function sendTwoWayRPCToDevice() {
    serverTwoWayRPCToDevice({
        deviceId: device.id,
        method: 'echo',
        params: {
            action: 'echo',
            test: 'test',
        },
        persistent: true,
        retries: 3,
        timeout: 5 * 1000,
    });
}

sendTwoWayRPCToDevice();

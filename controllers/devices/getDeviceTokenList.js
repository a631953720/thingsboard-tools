const getDeviceToken = require('./getDeviceToken');

async function getDeviceTokenList(deviceList) {
    try {
        const deviceTokenList = [];

        if (!Array.isArray(deviceList)) throw new Error('deviceList is not a array');

        for (let i = 0; i < deviceList.length; i++) {
            const token = await getDeviceToken(deviceList[i].id);
            deviceTokenList.push({
                name: deviceList[i].name,
                id: deviceList[i].id,
                token
            });
        }

        return deviceTokenList;
    } catch (error) {
        console.error("[Get device token list error]", error);
        return error;
    }
}

module.exports = getDeviceTokenList;
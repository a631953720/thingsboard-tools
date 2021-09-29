const { showLog } = require('./showMsgOnLog');

function jsonParse(params) {
    try {
        const jsonObject = JSON.parse(params);
        return jsonObject;
    } catch (error) {
        showLog('jsonParser error');
        return params;
    }
}

function jsonStringify(params) {
    try {
        const jsonString = JSON.stringify(params);
        return jsonString;
    } catch (error) {
        showLog('jsonStringify error');
        return params;
    }
}

module.exports = {
    jsonParse,
    jsonStringify,
};

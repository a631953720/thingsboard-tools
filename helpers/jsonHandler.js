const { showErrorLog } = require('./showMsgOnLog');

function jsonParse(params) {
    try {
        const jsonObject = JSON.parse(params);
        return jsonObject;
    } catch (error) {
        showErrorLog('Json parse', 'jsonParser error');
        return params;
    }
}

function jsonStringify(params) {
    try {
        const jsonString = JSON.stringify(params);
        return jsonString;
    } catch (error) {
        showErrorLog('Json stringify', 'jsonStringify error');
        return params;
    }
}

module.exports = {
    jsonParse,
    jsonStringify,
};

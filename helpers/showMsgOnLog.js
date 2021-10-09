const { SERVER } = require('../constant/env');
const {
    showSimpleMessage,
    commonLoggerConfig,
} = require('./basicLogger');

const { isDebug } = SERVER;

function showDebugLog(logType = 'default', ...args) {
    // = debugLog.silent = !isDebug;
    if (isDebug) {
        commonLoggerConfig.info({
            label: `[${logType}]`,
            message: args,
        });
    }
}

function showWarningLog(warningType = 'default', ...args) {
    commonLoggerConfig.warn({
        label: `[${warningType}]`,
        message: args,
    });
}

function showErrorLog(errorType = 'default', ...args) {
    commonLoggerConfig.error({
        label: `[${errorType}]`,
        message: args,
    });
}

module.exports = {
    showDebugLog,
    showErrorLog,
    showWarningLog,
    showSimpleMessage: showSimpleMessage.info,
};

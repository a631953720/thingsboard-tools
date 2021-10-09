const {
    createLogger,
    format,
    transports,
} = require('winston');

const {
    combine,
    timestamp,
    label,
    prettyPrint,
    simple,
} = format;

const { SERVER } = require('../constant/env');

const { isDebug } = SERVER;

const showSimpleMessage = createLogger({
    format: simple(),
    transports: [new transports.Console()],
});

const commonLoggerConfig = (logType = '') => (
    createLogger({
        format: combine(
            label({ label: logType }),
            timestamp(),
            prettyPrint(),
        ),
        transports: [new transports.Console()],
    })
);

function showDebugLog(logType = 'default', ...args) {
    const debugLog = commonLoggerConfig(logType);
    if (isDebug) debugLog.info(args);
}

function showWarningLog(warningType = 'default', ...args) {
    const debugLog = commonLoggerConfig(warningType);
    debugLog.warn(args);
}

function showErrorLog(errorType = 'default', ...args) {
    const errorLogger = commonLoggerConfig(errorType);
    errorLogger.error(args);
}

module.exports = {
    showDebugLog,
    showErrorLog,
    showWarningLog,
    showSimpleMessage: showSimpleMessage.info,
};

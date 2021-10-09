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

function showDebugLog(logType = 'default', ...args) {
    const debugLog = createLogger({
        format: combine(
            label({ label: logType }),
            timestamp(),
            prettyPrint(),
        ),
        transports: [new transports.Console()],
    });

    if (isDebug) {
        debugLog.info(args);
    }
}

function showError(errorType = 'default', ...args) {
    const errorLogger = createLogger({
        format: combine(
            label({ label: errorType }),
            timestamp(),
            prettyPrint(),
        ),
        transports: [new transports.Console()],
    });
    errorLogger.error(args);
}

module.exports = {
    showDebugLog,
    showError,
    showSimpleMessage: showSimpleMessage.info,
};

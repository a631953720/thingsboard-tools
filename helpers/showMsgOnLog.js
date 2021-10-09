const {
    createLogger,
    format,
    transports,
} = require('winston');
const { SERVER } = require('../constant/env');

const {
    combine,
    timestamp,
    label,
    simple,
    colorize,
    printf,
    prettyPrint,
} = format;
const { isDebug } = SERVER;

// Modify log format and colors
const alignColorsAndTime = (logType = '') => (
    combine(
        label({ label: logType }),
        colorize({
            all: true,
        }),
        timestamp({
            format: 'YYYY-MM-DD HH:MM:SS',
        }),
        printf(
            (info) => (`${info.level} ${info.timestamp} [${info.label}]: ${info.message} `),
        ),
    )
);

// This logger will show information to user
const showSimpleMessage = createLogger({
    format: combine(
        colorize(),
        simple(),
    ),
    transports: [new transports.Console()],
});

// This logger will show log likes debug, warning, error, etc...
const commonLoggerConfig = (logType = '') => (
    createLogger({
        transports: [
            new transports.Console({
                format: alignColorsAndTime(logType),
            }),
            new transports.File({
                format: prettyPrint(), // Log file don't need color!
                filename: './output/error.log',
                level: 'error',
            }),
        ],
    })
);

function showDebugLog(logType = 'default', ...args) {
    const debugLog = commonLoggerConfig(logType);
    if (isDebug) debugLog.info(args); // = debugLog.silent = !isDebug;
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

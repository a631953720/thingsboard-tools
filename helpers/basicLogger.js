const {
    createLogger,
    format,
    transports,
} = require('winston');

const {
    combine,
    timestamp,
    simple,
    colorize,
    printf,
    prettyPrint,
} = format;

// This logger will show information to user
const showSimpleMessage = createLogger({
    format: combine(
        colorize(),
        simple(),
    ),
    transports: [new transports.Console()],
});

// Modify log format and colors
const alignColorsAndTime = combine(
    colorize({
        all: true,
    }),
    timestamp({
        format: 'YYYY-MM-DD HH:MM:SS',
    }),
    printf(
        (info) => (`${info.level} ${info.timestamp} ${info.label} ${info.message} `),
    ),
);

// This logger will show log likes debug, warning, error, etc...
const commonLoggerConfig = createLogger({
    transports: [
        new transports.Console({
            format: alignColorsAndTime,
        }),
        new transports.File({
            format: prettyPrint(), // Log file don't need color!
            filename: './output/error.log',
            level: 'error',
        }),
    ],
});

module.exports = {
    showSimpleMessage,
    commonLoggerConfig,
};

const winston = require('winston');
const config = require('./config');

// Winston log customizations
const custom = {
  levels: {
    error: 0,
    warn: 1,
    help: 2,
    data: 3,
    info: 4,
    debug: 5,
    prompt: 6,
    verbose: 7,
    input: 8,
    trace: 9,
  },
  colors: {
    trace: 'magenta',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    debug: 'blue',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red',
  },
  consoleOpts: {
    prettyPrint: true,
    colorize: true,
    silent: false,
    timestamp: true,
  },
  fileOpts: {
    prettyPrint: true,
    colorize: true,
    silent: false,
    timestamp: true,
  },
};

// Node system log
const syslog = new winston.Logger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  levels: custom.levels,
  transports: [
    new (winston.transports.Console)(custom.consoleOpts),
  ],
});

module.exports = syslog;

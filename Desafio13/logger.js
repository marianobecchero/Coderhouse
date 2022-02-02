const log4js = require('log4js')

log4js.configure({
  appenders: {
    consola: { type: 'console' },
    archivoErrores: { type: 'file', filename: 'logs/errores.log' },
    archivoWarn: { type: 'file', filename: 'logs/warn.log' },
    archivoInfo: { type: 'file', filename: 'logs/info.log' },
    loggerConsola: {
      type: 'logLevelFilter',
      appender: 'consola',
      level: 'info',
    },
    loggerArchivoErrores: {
      type: 'logLevelFilter',
      appender: 'archivoErrores',
      level: 'error',
    },
    loggerArchivoWarn: {
      type: 'logLevelFilter',
      appender: 'archivoWarn',
      level: 'warn',
    },
    loggerArchivoInfo: {
        type: 'logLevelFilter',
        appender: 'archivoInfo',
        level: 'info',
      },
  },
  categories: {
    default: {
      appenders: ['loggerConsola', 'loggerArchivoErrores', 'loggerArchivoWarn', 'loggerArchivoInfo'],
      level: 'all',
    },
  },
});

let logger = log4js.getLogger();

module.exports = { logger }
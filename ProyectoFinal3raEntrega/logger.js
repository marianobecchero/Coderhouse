const log4js = require('log4js')

log4js.configure({
  appenders: {
    consola: { type: 'console' },
    archivoErrores: { type: 'file', filename: 'logs/errores.log' },
    archivoWarn: { type: 'file', filename: 'logs/warn.log' },
    //archivoDebug: { type: 'file', filename: 'debug.log' },
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
      },/*
    loggerArchivoDebug: {
      type: 'logLevelFilter',
      appender: 'archivoDebug',
      level: 'debug',
    },*/
  },
  categories: {
    default: {
      appenders: ['loggerArchivoErrores', 'loggerArchivoWarn',/* 'loggerArchivoDebug'*/],
      level: 'all',
    }/*,
    prod: {
      appenders: ['loggerArchivoErrores', 'loggerArchivoDebug'],
      level: 'all',
    },*/
  },
})

let logger = log4js.getLogger();

/*if (process.env.NODE_ENV === 'PROD') {
  logger = log4js.getLogger('prod')
} else {
  logger = log4js.getLogger()
}*/

module.exports = { logger }

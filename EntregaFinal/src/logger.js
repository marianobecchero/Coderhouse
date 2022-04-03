const log4js = require('log4js')

log4js.configure({
    appenders: {
      consola: { type: 'console' },
      archivoErrores: { type: 'file', filename: 'src/logs/errores.log' },
      archivoDebug: { type: 'file', filename: 'src/logs/debug.log' },
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
      loggerArchivoDebug: {
        type: 'logLevelFilter',
        appender: 'archivoDebug',
        level: 'debug',
      },
    },
    categories: {
      default: {
        appenders: ['loggerConsola', 'loggerArchivoErrores', 'loggerArchivoDebug'],
        level: 'all',
      },
      /*prod: {
        appenders: ['loggerArchivoInfo', 'loggerArchivoErrores', 'loggerArchivoDebug'],
        level: 'all',
      },*/
    },
  })

let logger = null

//if (process.env.NODE_ENV === 'PROD') {
    //logger = log4js.getLogger('prod')
//} else {
    logger = log4js.getLogger()
//}

module.exports = { logger }
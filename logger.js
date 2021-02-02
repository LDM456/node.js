var log4js = require('log4js')

log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.json' } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } },
})
var logger = log4js.getLogger()
logger.level = 'debug'

module.exports = logger

const ip = require('ip')
const logger = require('../lib/logger')
const port = require('../../project.config').port
logger.info('Starting server...')
require('../../server/main').listen(port, () => {
  logger.success(`Server is running at http://${ip.address()}:${port}`)
})

import { devLogger, prodLogger } from '../config/logger/logger.config.js'
import config from '../config/configuration.js'

function sanitizeBody(body) {
  const sanitizedBody = { ...body }
  if (sanitizedBody.password) {
    delete sanitizedBody.password // Elimina el campo 'password'
  }
  return sanitizedBody
}

export const addLogger = (req, res, next) => {
  const logger = config.environment === 'DESARROLLO' ? devLogger : prodLogger
  const { method, url, query, params, body } = req

  if (url === '/status') {
    return next();
  }

  if (res) {
    const originalSend = res.send

    res.send = function (body) {
      const responseBody = body instanceof Buffer ? 'Buffer' : body // Manejo especial para Buffer si es necesario
      const logInfo = {
        // statusCode: res.statusCode,
        body: responseBody
      }

      logger.info('Response sent ', logInfo)
      originalSend.apply(res, arguments)
    }
  }

  const logInfo = {
    method,
    url,
    query: Object.keys(query).length ? query : 'Empty',
    params: Object.keys(params).length ? params : 'Empty',
    body: Object.keys(body).length ? sanitizeBody(body) : 'Empty'
  }

  const filteredLogInfo = Object.fromEntries(
    Object.entries(logInfo).filter(([_, v]) => v !== 'Empty')
  )

  logger.info('Request received ', filteredLogInfo)
  req.logger = logger
  next()
}

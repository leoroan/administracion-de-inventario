import { devLogger, prodLogger } from '../config/logger/logger.config.js';
import config from '../config/configuration.js';

function sanitizeBody(body) {
  if (typeof body === 'object' && body !== null) {
    const sanitizedBody = { ...body };
    if (sanitizedBody.password) {
      delete sanitizedBody.password;
    }
    return sanitizedBody;
  }
  return body;
}

export const addLogger = (req, res, next) => {
  const logger = config.environment === 'DESARROLLO' ? devLogger : prodLogger;
  const { method, url, query, params, body } = req;

  if (url === '/status') {
    return next();
  }

  const originalSend = res.send;

  res.send = function (body) {
    let responseBody;
    try {
      responseBody = typeof body === 'string' ? JSON.parse(body) : body;
    } catch (e) {
      responseBody = body;
    }

    const sanitizedResponseBody = sanitizeBody(responseBody);

    const logInfo = {
      statusCode: res.statusCode,
      body: body
    };

    if (!res._logged) {
      logger.info('Response sent ', logInfo);
      res._logged = true;
    }
    return originalSend.apply(this, arguments);
  };

  const logInfo = {
    method,
    url,
    query: Object.keys(query).length ? query : 'Empty',
    params: Object.keys(params).length ? params : 'Empty',
    body: Object.keys(body).length ? sanitizeBody(body) : 'Empty'
  };

  const filteredLogInfo = Object.fromEntries(
    Object.entries(logInfo).filter(([_, v]) => v !== 'Empty')
  );

  logger.info('Request received ', filteredLogInfo);
  req.logger = logger;
  next();
};

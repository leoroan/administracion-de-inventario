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

  const logInfo = {
    method,
    url,
    query: Object.keys(query).length ? query : 'Empty',
    params: Object.keys(params).length ? params : 'Empty',
    body: Object.keys(body).length ? sanitizeBody(body) : 'Empty',
  };

  const filteredLogInfo = Object.fromEntries(
    Object.entries(logInfo).filter(([_, v]) => v !== 'Empty')
  );

  logger.info('Request received ', filteredLogInfo);
  req.logger = logger;

  // Escuchar el evento 'finish' de la respuesta
  res.on('finish', () => {
    const responseBody = res.locals.body || {}; // Usar `res.locals` para almacenar el cuerpo de la respuesta
    const sanitizedResponseBody = sanitizeBody(responseBody);
    const responseLogInfo = {
      statusCode: res.statusCode,
      body: sanitizedResponseBody,
    };

    logger.info('Response sent ', responseLogInfo);
  });

  // Middleware para capturar el cuerpo de la respuesta antes de enviarla
  const originalSend = res.send;
  res.send = function (body) {
    // Intentar parsear el cuerpo si es un string JSON
    try {
      res.locals.body = typeof body === 'string' ? JSON.parse(body) : body;
    } catch (e) {
      res.locals.body = body; // Si no es un string JSON, guardar el cuerpo tal cual
    }

    return originalSend.apply(this, arguments);
  };

  next();
};


// export const addLogger = (req, res, next) => {  
//   const logger = config.environment === 'DESARROLLO' ? devLogger : prodLogger;
//   const { method, url, query, params, body } = req;
//   const originalSend = res.send;

//   if (url === '/status') {
//     return next();
//   }

//   res.send = function (body) {
//     let responseBody;
//     try {
//       responseBody = typeof body === 'string' ? JSON.parse(body) : body;
//     } catch (e) {
//       responseBody = body;
//     }
//     const sanitizedResponseBody = sanitizeBody(responseBody);
//     const logInfo = {
//       statusCode: res.statusCode,
//       body: sanitizedResponseBody
//     };
//     // logInfo.body = logInfo.body.replace(/\u001b\[\d+m/g, '')    

//     logger.info('Response sent ', logInfo);
//     return originalSend.apply(this, arguments);
//   };

//   const logInfo = {
//     method,
//     url,
//     query: Object.keys(query).length ? query : 'Empty',
//     params: Object.keys(params).length ? params : 'Empty',
//     body: Object.keys(body).length ? sanitizeBody(body) : 'Empty'
//   };

//   const filteredLogInfo = Object.fromEntries(
//     Object.entries(logInfo).filter(([_, v]) => v !== 'Empty')
//   );

//   logger.info('Request received ', filteredLogInfo);
//   req.logger = logger;
//   next();
// };

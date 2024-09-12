import { devLogger, prodLogger } from '../config/logger/logger.config.js'
import config from '../config/configuration.js'

// export const addLogger = (req, res, next) => {
//   const logger = config.environment === 'DEV' ? devLogger : prodLogger;
//   req.logger = logger;
//   next();
// };

function sanitizeBody(body) {
  const sanitizedBody = { ...body }
  if (sanitizedBody.password) {
    delete sanitizedBody.password // Elimina el campo 'password'
  }
  return sanitizedBody
}

export const addLogger = (req, res, next) => {
  const logger = config.environment === 'DEV' ? devLogger : prodLogger
  const { method, url, query, params, body } = req

  if (url === '/status') {
    return next();
  }

  if (res) {
    const originalSend = res.send

    // Sobrescribe el método send de la respuesta para registrar el mensaje
    res.send = function (body) {
      const responseBody = body instanceof Buffer ? 'Buffer' : body // Manejo especial para Buffer si es necesario
      const logInfo = {
        statusCode: res.statusCode,
        body: responseBody
      }

      logger.info('Response sent ', logInfo)

      // Llama al método send original con los mismos argumentos
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

// export const addLogger = (req, res, next) => {
//   const logger = config.environment === 'DEV' ? devLogger : prodLogger;
//   const { method, url, query, params, body } = req;

//   const logInfo = {
//     method,
//     url,
//     query: Object.keys(query).length ? query : 'Empty',
//     params: Object.keys(params).length ? params : 'Empty',
//     body: Object.keys(body).length ? sanitizeBody(body) : 'Empty',
//   };

//   const filteredLogInfo = Object.fromEntries(
//     Object.entries(logInfo).filter(([_, v]) => v !== 'Empty')
//   );

//   logger.info('Request received ', filteredLogInfo);
//   req.logger = logger;
//   next();
// };

// function sanitizeBody(body) {
//   const sanitizedBody = { ...body };
//   if (sanitizedBody.password) {
//     delete sanitizedBody.password; // Elimina el campo 'password'
//   }
//   return sanitizedBody;
// }

// export const addLogger = (req, res, next) => {
//   const logger = config.environment === 'DEV' ? devLogger : prodLogger; // Ajusta según tu configuración
//   const { method, url, body, query, params, user } = req;

//   let statusCode = 200;
//   let resArgument = '';
//   const originalSend = res.send;
//   res.send = function (body) {
//     originalSend.apply(res, arguments);
//     console.log(arguments);
//     statusCode = res.statusCode;
//     resArgument = arguments[0];
//     return res;
//   };

//   // Escucha el evento 'finish' para asegurarse de capturar el estado de la respuesta
//   res.on('finish', () => {
//     const logInfo = {
//       method,
//       url,
//       // body: Object.keys(body).length ? body : 'Empty',
//       body: Object.keys(body).length ? sanitizeBody(body) : 'Empty',
//       query: Object.keys(query).length ? query : 'Empty',
//       params: Object.keys(params).length ? params : 'Empty',
//       // headers: req.headers, // Incluye todos los headers de la solicitud
//       user: user ? user.username : 'Empty',
//       statusCode,
//       resArgument,
//       timestamp: new Date().toISOString(),
//     };

//     const filteredLogInfo = Object.fromEntries(
//       Object.entries(logInfo).filter(([_, v]) => v !== 'Empty')
//     );

//     logger.info('Request received', filteredLogInfo); // Loguea el objeto filtrado
//     req.logger = logger; // Agrega el objeto filtrado a req.logger para usarlo en otros middlewares o rutas
//   });

//   next();
// };

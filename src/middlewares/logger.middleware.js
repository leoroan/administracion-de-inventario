import { devLogger, prodLogger } from '../config/logs/logger.config.js';
import config from '../config/config.js';

// export const addLogger = (req, res, next) => {
//   const logger = config.environment === 'DEV' ? devLogger : prodLogger;
//   const logMessage = `${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;

//   logger.warning(logMessage);
//   logger.http(logMessage);
//   logger.error(logMessage);
//   logger.debug(logMessage);
//   logger.info(logMessage);
//   logger.fatal(logMessage);

//   next();
// };


export const addLogger = (req, res, next) => {
  const logger = config.environment === 'DEV' ? devLogger : prodLogger;
  req.logger = logger;
  next();
};
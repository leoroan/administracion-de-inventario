// import createError from 'http-errors'
// export default class CustomError extends createError {
//   constructor (status, message, originalError) {
//     super(status, message)
//     this.originalError = originalError
//   }

//   // to be improved by gaby.g
//   static handleSequelizeError (error, reason) {
//     if (error.name === 'SequelizeUniqueConstraintError') {
//       return new CustomError(500, error.original.detail)
//     } else if (error.name === 'SequelizeValidationError') {
//       const validationErrors = error.errors.map(err => {
//         return `${err.message}`
//       })
//       const validationErrorsString = validationErrors.join(' || ')
//       return new CustomError(400, validationErrorsString)
//     } else {
//       return new CustomError(500, reason, error.message)
//     }
//   }
// }

import createError from 'http-errors';
import { devLogger as logger } from '../config/logger/logger.config.js'; // Ajusta según el entorno

export default class CustomError extends createError {
  constructor(status, message, originalError) {
    super(status, message);
    this.originalError = originalError;
    this.logError();
  }

  logError() {
    const logMessage = `${this.message}${this.originalError ? ` - ${this.originalError}` : ''}`;
    if (this.status >= 500) {
      logger.fatal(logMessage);
    } else if (this.status >= 400) {
      logger.warning(logMessage);
    } else {
      logger.info(logMessage);
    }
  }

  // static handleSequelizeError(error, reason) {
  //   if (error.name === 'SequelizeUniqueConstraintError') {
  //     return new CustomError(500, error.original.detail);
  //   } else if (error.name === 'SequelizeValidationError') {
  //     const validationErrors = error.errors.map(err => err.message);
  //     const validationErrorsString = validationErrors.join(' || ');
  //     return new CustomError(400, validationErrorsString);
  //   } else {
  //     return new CustomError(500, reason, error.message);
  //   }
  // }
  static handleSequelizeError(error, reason) {
    const errorMapping = {
      SequelizeUniqueConstraintError: () => new CustomError(500, error.original.detail),
      SequelizeValidationError: () => {
        const validationErrorsString = error.errors.map(err => err.message).join(' || ');
        return new CustomError(400, validationErrorsString);
      }
    };

    const handler = errorMapping[error.name] || (() => new CustomError(500, reason, error.message));
    return handler();
  }

}

import createError from 'http-errors';
export default class CustomError extends createError {
  constructor(status, message, originalError) {
    super(status, message);
    this.originalError = originalError;
  }

  // to be improved by gaby.g
  static handleSequelizeError(error, reason) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return new CustomError(500, error.original.detail);
    } else if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => {
        return `${err.message}`;
      });
      const validationErrorsString = validationErrors.join(' || ');
      return new CustomError(400, validationErrorsString);
    } else {
      return new CustomError(500, reason, error.message);
    }
  }

}


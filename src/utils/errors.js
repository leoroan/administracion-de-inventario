import { devLogger } from "../config/logger/logger.config.js";

export class UnauthorizedError extends Error {
  constructor(message = 'User not authenticated or missing token') {
    super(message);
    this.statusCode = 401;
    devLogger.error(`UnauthorizedError: ${message}`);
  }
}

export class ForbiddenError extends Error {
  constructor(message = 'Token invalid or user with no access') {
    super(message);
    this.statusCode = 403;
    devLogger.error(`ForbiddenError: ${message}`);
  }
}

export class ClientError extends Error {
  constructor(message = 'Bad request from client') {
    super(message);
    this.statusCode = 400;
    devLogger.error(`ClientError: ${message}`);
  }
}

export class InternalServerError extends Error {
  constructor(message = 'Internal server error') {
    super(message);
    this.statusCode = 500;
    devLogger.error(`InternalServerError: ${message}`);
  }
}

export class SequelizeError {
  static handleSequelizeError(error, defaultMessage) {
    let customError;
    if (error.name === 'SequelizeValidationError') {
      customError = new ClientError(`Validation Error: ${error.message}`);
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      customError = new ClientError(`Duplicate Error: ${error.message}`);
    } else {
      customError = new InternalServerError(defaultMessage || 'Database Error');
    }
    devLogger.error(`SequelizeError: ${customError.message}, Stack: ${error.stack}`);

    return customError;
  }
}


import { devLogger } from "../config/logger/logger.config.js";

const errorHandler = (err, req, res, next) => {
  // Verifica si el error es personalizado y tiene un statusCode
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      status: 'Error',
      message: err.message
    });
  }

  // Si no es un error personalizado, maneja como un error genérico del servidor
  devLogger.debug('Unexpected error:', err);
  res.status(500).json({
    status: 'Error',
    message: 'Internal Server Error'
  });
};

export default errorHandler;

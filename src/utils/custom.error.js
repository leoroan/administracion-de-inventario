import createError from 'http-errors';
export default class CustomError extends createError {
  constructor(status, message, originalError) {
    super(status, message);
    this.originalError = originalError;
  }

  static handleSequelizeError(error, reason) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return new CustomError(500, error.name, error.original.detail); //SequelizeUniqueConstraintError {"originalError":"Ya existe la llave (email)=(gguas@transporte.gba.gob.ar)."}
    } else {
      return new CustomError(500, reason, error.message); //Error al actualizar el empleado {"originalError":"Error al actualizar, el ID: 55 no es correcto o no se encuentra"}
    }
  }
}

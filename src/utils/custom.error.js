export default class CustomError extends Error {
  constructor(mensaje, detalle) {
    super(mensaje);
    // this.name = this.constructor.name;
    this.detalle = detalle;
    Error.captureStackTrace(this, this.constructor);
  }
}
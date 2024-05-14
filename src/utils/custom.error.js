export default class CustomError extends Error {
  constructor(message, detail) {
    super(message);
    this.detail = detail;
  }
}

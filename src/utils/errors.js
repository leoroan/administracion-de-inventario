class UnauthorizedError extends Error {
  constructor(message = 'User not authenticated or missing token') {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message = 'Token invalid or user with no access') {
    super(message);
    this.statusCode = 403;
  }
}

class ClientError extends Error {
  constructor(message = 'Bad request from client') {
    super(message);
    this.statusCode = 400;
  }
}

class InternalServerError extends Error {
  constructor(message = 'Internal server error') {
    super(message);
    this.statusCode = 500;
  }
}

export { UnauthorizedError, ForbiddenError, ClientError, InternalServerError };

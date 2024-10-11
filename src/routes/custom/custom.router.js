import jwt from "jsonwebtoken";
import { Router } from "express";
import { PRIVATE_KEY } from "../../utils/jwt.js";
import { ClientError, ForbiddenError, InternalServerError, SequelizeError, UnauthorizedError } from "../../utils/errors.js";
import { devLogger } from "../../config/logger/logger.config.js";

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  };

  getRouter() {
    return this.router;
  };

  init() { };

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.#applyCallbacks(callbacks))
  }

  // POST
  post(path, policies, ...callbacks) {
    this.router.post(path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.#applyCallbacks(callbacks));
  };

  // PUT
  put(path, policies, ...callbacks) {
    this.router.put(path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.#applyCallbacks(callbacks));
  };

  // DELETE
  delete(path, policies, ...callbacks) {
    this.router.delete(path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.#applyCallbacks(callbacks));
  };

  handlePolicies = (policies) => (req, res, next) => {
    const conPostman = process.env.USE_POSTMAN === 'true';
    if (policies[0] === "PUBLIC") return next();
    const authHeader = conPostman ? req.cookies : req.headers.authorization;    
    if (!authHeader) throw new UnauthorizedError();
    const token = conPostman ? authHeader['jwtCookieToken'] : authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedError('Token missing');
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
      if (err) throw new ForbiddenError('Invalid token: '+err);
      if (!(decoded.user.rol <= policies[0])) {
        throw new ForbiddenError('User does not have access, rol level low');
      }
      next();
    });
  };

  generateCustomResponses = (req, res, next) => {
    const cleanMessage = (message) => {
      return typeof message === 'string' ? message.replace(/\u001b\[\d+m/g, '') : message;
    };
    res.sendSuccess = (payload, user = req.user) => res.status(200).send({ payload, Requester: user.username });
    res.sendError = (error, user = req.user) => {
      const cleanErrorMessage = cleanMessage(error.message || error);
      const response = {
        status: 'error',
        message: cleanErrorMessage,
        Requester: user?.username || 'none',
      };
      if (error instanceof UnauthorizedError) {
        return res.status(error.statusCode).send(response);
      } else if (error instanceof ForbiddenError) {
        return res.status(error.statusCode).send(response);
      } else if (error instanceof ClientError) {
        return res.status(error.statusCode).send(response);
      } else if (error instanceof InternalServerError) {
        return res.status(error.statusCode).send(response);
      } else {
        return res.status(500).send(`Internal Server Error, ${cleanErrorMessage}`);
      }
    };
    next();
  };

  #applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (req, res, next) => {
      try {
        await callback(req, res, next);
      } catch (error) {
        devLogger.debug(error);
        next(error);
      }
    });
  };
}
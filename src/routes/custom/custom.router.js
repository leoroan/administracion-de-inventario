import { Router } from "express";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../../utils/jwt.js";
import { ForbiddenError, InternalServerError, UnauthorizedError } from "../../utils/errors.js";
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
    const conPostman = process.env.USE_POSTMAN;

    if (policies[0] === "PUBLIC") return next();
    // const authHeader = req.cookies; //for postman
    // const authHeader = req.headers.authorization;  // for explorer
    const authHeader = conPostman ? req.cookies : req.headers.authorization;
    // if (!authHeader) {
    //   return res.status(401).send({ error: "User not authenticated or missing token." });
    // }
    if (!authHeader) throw new UnauthorizedError();
    // const token = authHeader['jwtCookieToken'];//for postman
    // const token = authHeader.split(' ')[1];// for explorer
    const token = conPostman ? authHeader['jwtCookieToken'] : authHeader.split(' ')[1];
    // if (!token) {
    //   return res.status(401).send("Token missing.");
    // }
    if (!token) throw new UnauthorizedError('Token missing');
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
      // if (err) {
      //   return res.status(403).send("Invalid token.");
      // }
      if (err) throw new ForbiddenError('Invalid token');
      // const userRole = decoded.user.rol;
      // if (!policies.includes(userRole)) {
      //   return res.status(403).send("User does not have access.");
      // }
      if (!policies.includes(decoded.user.rol)) {
        throw new ForbiddenError('User does not have access');
      }
      next();
    });
  };

  generateCustomResponses = (req, res, next) => {
    //Custom responses 
    res.sendSuccess = (payload) => res.status(200).send({ status: "Success", payload });
    // res.sendInternalServerError = error => res.status(500).send({ status: "Error", error });
    // res.sendClientError = error => res.status(400).send({ status: "Client Error, Bad request from client.", error });
    // res.sendUnauthorizedError = error => res.status(401).send({ error: "User not authenticated or missing token.", error });
    // res.sendForbiddenError = error => res.status(403).send({ error: "Token invalid or user with no access, Unauthorized please check your roles!" });
    next()
  }

  #applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...item) => {
      try {
        await callback.apply(this, item);
      } catch (error) {
        devLogger.error(error);
        // params[1] hace referencia al res
        // item[1].status(500).send(error);
        next(new InternalServerError());
      }
    });
  };
}
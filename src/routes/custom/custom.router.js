import { Router } from "express";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../../utils/jwt.js";
export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  };

  getRouter() {
    return this.router;
  };

  //Esta inicialilzacion se usa para las clases heredadas.
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

  // Policies for public, premium, admin
  handlePolicies = (policies) => (req, res, next) => {
    //Validar si tiene acceso publico:
    if (policies[0] === "PUBLIC") return next();

    // Verificar si el usuario es público o administrador
    const userRole = req.headers.user_role; // Suponiendo que el rol del usuario se envía en los encabezados como user_role

    // Si el usuario es público o administrador, permitir el acceso
    if (policies.includes(userRole)) {
      return next();
    }

    // Si el usuario no es público ni administrador, verificar el token
    const token = req.headers.authorization;

    // Si no hay token, enviar error de autorización
    if (!token) {
      return res.sendUnauthorizedError("Token missing.");
    }

    // Verificar el token
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
      if (err) {
        return res.sendForbiddenError("Invalid token.");
      }

      // Verificar si el usuario tiene el rol necesario
      const userRole = decoded.role; // Suponiendo que el rol está almacenado en la carga útil del token como role
      if (!policies.includes(userRole)) {
        return res.sendForbiddenError("User does not have access.");
      }

      // Usuario tiene acceso, proceder al siguiente middleware
      next();
    });
  };

  generateCustomResponses = (req, res, next) => {

    function obtenerIds(payload) {
      if (Array.isArray(payload)) {
        return "Cantidad encontrada: " + payload.length;
      } else if (typeof payload === 'object' && payload !== null) {
        return "Cantidad encontrada: 1";
      } else {
        return null;
      }
    }

    res.sendSuccess = payload => { req.logger.info(obtenerIds(payload)), res.status(200).send(payload) };
    res.sendInternalServerError = (error) => { req.logger.fatal(error), res.status(500).send({ status: "Internal server error", error: error }) };
    res.sendClientError = (error) => { req.logger.error(error), res.status(400).send({ status: "Client Error, Bad request from client.", error }) };
    res.sendUnauthorizedError = error => { req.logger.fatal(error), res.status(401).send({ error: "User not authenticated or missing token." }) };
    res.sendForbiddenError = error => { req.logger.fatal(error), res.status(403).send({ error: "Token invalid or user with no access, Unauthorized please check your roles!" }) };
    next()
  }


  // función que procese todas las funciones internas del router (middlewares y el callback principal)
  #applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...item) => {
      try {
        await callback.apply(this, item);
      } catch (error) {
        console.error(error);
        // params[1] hace referencia al res
        item[1].status(500).send(error);
      }
    });
  };
}
import jwt from "jsonwebtoken";
import { Router } from "express";
import { PRIVATE_KEY } from "../../utils/jwt.js";
import { BadRequest, Forbidden, Unauthorized } from "../../config/error/errors.js";
import { devLogger } from "../../config/logger/logger.config.js";
import { models } from "../../config/db/sequelize.config.js";
import { Op } from "sequelize";

const MSERV_KEY = process.env.KEY_MSERV_MAIL;
const SERVICE_KEY = process.env.HEALTH_SERVICE_KEY;

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.routes = [];
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() { }

  addRoute(method, path, policies, callbacks) {
    this.routes.push({ method, path, policies });
    this.router[method](
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.#applyCallbacks(callbacks)
    );
  }

  get(path, policies, ...callbacks) {
    this.addRoute('get', path, policies, callbacks);
  }

  post(path, policies, ...callbacks) {
    this.addRoute('post', path, policies, callbacks);
  }

  put(path, policies, ...callbacks) {
    this.addRoute('put', path, policies, callbacks);
  }

  delete(path, policies, ...callbacks) {
    this.addRoute('delete', path, policies, callbacks);
  }

  getRoutes() {
    return this.routes;
  }

  handlePolicies = (policies) => async (req, res, next) => {
    if (policies[0] === "PUBLIC" || policies.length === 0) return next();
    const keyPolicies = {
      "MICRO-SERVICE-KEY": { header: "x-micro-service-key", value: MSERV_KEY },
      "SERVICE_KEY": { header: "x-service-key", value: SERVICE_KEY }
    };

    if (keyPolicies[policies[0]]) {
      const { header, value } = keyPolicies[policies[0]];
      const key = req.headers[header];
      if (!key || key !== value) {
        throw new Unauthorized("Clave de servicio inválida o faltante.");
      }
      return next();
    }
    try {
      const token = req.cookies?.jwtCookieToken || req.headers.authorization?.split(' ')[1];
      if (!token) throw new Unauthorized('Usuario sin autenticarse o falta el token.');

      const decoded = jwt.verify(token, PRIVATE_KEY);

      // Extraer el recurso del baseUrl: /api/usuarios -> "usuarios" -> "usuario"
      const baseUrlParts = req.baseUrl.split('/');
      const recurso = baseUrlParts[2].endsWith('s') ? baseUrlParts[2].slice(0, -1) : baseUrlParts[2]; // Porque /api/usuarios -> [ '', 'api', 'usuarios' ], luego, sin la "s"
      if (!recurso) throw new BadRequest("No se pudo determinar el recurso del endpoint.");

      const user = await models.Usuario.findByPk(decoded.user.id, {
        attributes: ["id", "username", "email"],
        include: [
          {
            association: "permisos",
            attributes: ["accion"],
            through: { attributes: [] },
            where: {
              accion: { [Op.like]: `${recurso}.%` }
            },
            required: false
          },
        ],
      });

      if (!user) throw new Unauthorized("Usuario no encontrado en la base de datos.");

      const permisosUsuario = user.permisos.map((p) => p.accion);

      const autorizado = policies.some((p) => permisosUsuario.includes(p));
      if (!autorizado) throw new Forbidden("PROHIBIDO: El usuario no tiene permisos.");
      next();
    } catch (err) {
      throw new Forbidden(err.message);
    }
  };

  generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (payload) => {
      res.status(200).json({
        status: 'success',
        payload,
        requester: req.user?.username || 'public'
      });
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
  }
}
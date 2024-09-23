import { devLogger } from '../config/logger/logger.config.js';
import { sessionService } from '../services/service.js';
import GenericController from './helper/generic.controller.js';
import { Session } from '../services/db/models/session.model.js';

export default class SessionController extends GenericController {
  constructor(service) {
    super(service);
  }

  async evaluateSession(user, token, req, res) {
    //check if exist
    const sesionExistente = await Session.findOne({ where: { empleadoId: user.id } });
    //if dont, create one
    if (!sesionExistente) {
      return await this.createSession(user, token);
    }
    // if exist, but it has fechaExpiracion as null
    if (!sesionExistente.dataValues.fechaExpiracion) {
      // return new Error("Session expired");
      return await sesionExistente.update({ tokenSesion: token, fechaExpiracion: new Date(Date.now() + 60 * 60 * 1000), ultimaConexion: new Date() });
    }
    // if exist, then update it
    return await sesionExistente.update({ tokenSesion: token, ultimaConexion: new Date() });
  }

  async createSession(user, token) {
    try {
      const newSession = await sessionService.create({
        tokenSesion: token,
        fechaInicio: new Date(),
        fechaExpiracion: new Date(Date.now() + 60 * 60 * 1000),
        ultimaConexion: new Date(),
        empleadoId: user.id
      });
      return newSession;
    } catch (error) {
      devLogger.debug(error)
      res.sendError(error);
    }
  }

}
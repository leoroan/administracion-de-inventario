import { devLogger } from '../config/logger/logger.config.js';
import { sessionService } from '../services/service.js';
import GenericController from './helper/generic.controller.js';
import { Session } from '../services/db/models/session.model.js';

// Crear un nuevo usuario
export default class SessionController extends GenericController {
  constructor(service) {
    super(service);
  }

  async initSession(user, token, req, res) {
    try {
      const sesionExistente = await Session.findOne({ where: { empleadoId: user.id } });
      if (sesionExistente) {
        await sesionExistente.update({ tokenSesion: token, ultimaConexion: new Date() });
      } else {
        const newSession = await sessionService.create({
          tokenSesion: token,
          fechaInicio: new Date(),
          empleadoId: user.id
        });
        return newSession;
      }
      return sesionExistente;
    } catch (error) {
      devLogger.debug(error)
      return res.sendError(error);
    }
  }

}
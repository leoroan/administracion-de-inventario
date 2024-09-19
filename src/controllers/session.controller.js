import { devLogger } from '../config/logger/logger.config.js';
import { sessionService } from '../services/service.js';
import GenericController from './helper/generic.controller.js';

// Crear un nuevo usuario
export default class SessionController extends GenericController {
  constructor(service) {
    super(service);
  }

  async initSession(user, token, req, res) {
    try {
      const newSession = await sessionService.create({
        tokenSesion: token,
        fechaInicio: new Date(),
        usuarioId: user.id
      });    
      return newSession;
    } catch (error) {
      devLogger.debug(error)
      return res.sendError(error);
    }
  }

}
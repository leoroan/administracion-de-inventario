import { devLogger } from '../config/logger/logger.config.js';
import { empleadoService } from '../services/service.js';
import GenericController from './helper/generic.controller.js';

// Crear un nuevo usuario
export default class EmpleadoController extends GenericController {
  constructor(service) {
    super(service);
  }
  
  async findByEmailORusername(req, res) {
    try {
      const user = await empleadoService.findByEmailORusername(req.params.some);
      return res.sendSuccess(user);
    } catch (error) {
      devLogger.error(error)
      res.sendError(error);
    }
  }

  async findByEmail(req, res) {
    try {
      const user = await empleadoService.findByEmail(req.params.email);
      return res.sendSuccess(user);
    } catch (error) {
      devLogger.error(error)
      res.sendError(error);
    }
  }


}



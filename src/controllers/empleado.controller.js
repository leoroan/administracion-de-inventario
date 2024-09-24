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
      return res.sendError(error);
    }
  }

  async findByEmail(req, res) {
    try {
      const user = await empleadoService.findByEmail(req.params.email);
      return res.sendSuccess(user);
    } catch (error) {
      devLogger.error(error)
      return res.sendError(error);
    }
  }

  async addOficina(req, res) {
    const { userId = null, oficinaId = null } = req.query;
    try {
      const empleado = await empleadoService.findById(userId);
      await empleado.setOficina(oficinaId);
      await empleado.save();
      res.sendSuccess('success');
    } catch (error) {
      res.sendError(`al querer asignarle oficina al empleado, ${error}`);
    }
  }

  async removeOficina(req, res) {
    const { userId } = req.query;
    try {
      const empleado = await empleadoService.findById(userId);
      await empleado.setOficina(null);
      await empleado.save();
      res.sendSuccess('success');
    } catch (error) {
      res.sendError(`al querer remover la oficina al empleado, ${error}`);
    }
  }

}



import { devLogger } from '../config/logger/logger.config.js';
import { empleadoService } from '../services/service.js';
import { createHash } from '../utils/bcrypt.js';
import GenericController from './helper/generic.controller.js';

// Crear un nuevo usuario
export default class EmpleadoController extends GenericController {
  constructor(service) {
    super(service);
  }

  async createAdministrator(req, res) {
    try {
      const adminUser = await empleadoService.findByEmailORusername("administrador");
      if (!adminUser) {
        await empleadoService.create({
          username: process.env.ADMIN_USER,
          password: createHash(process.env.ADMIN_PASS),
          rol: 'ADMIN',
          email: process.env.ADMIN_EMAIL,
          nombre: 'Administrador',
          apellido: 'General',
          dni: '00000000'
        });
        devLogger.info('[Administrator]: Has been created.');
      } else {
        devLogger.info('[Administrator]: Already exists.');
      }
    } catch (error) {
      devLogger.debug(`Error trying to create an Administrator: ${error.message}, Stack: ${error.stack}`);
    }
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



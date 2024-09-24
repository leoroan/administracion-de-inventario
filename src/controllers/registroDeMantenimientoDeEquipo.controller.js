import { devLogger } from '../config/logger/logger.config.js';
import { registroDeMantenimientoDeEquipoService } from '../services/service.js';
import GenericController from './helper/generic.controller.js';

// Crear un nuevo usuario
export default class RegistroDeMantenimientoDeEquipoController extends GenericController {
  constructor(service) {
    super(service);
  }

  async addRegistro(req, res) {
    const { equipoId = null, registroId = null } = req.query;
    try {
      const registro = await registroDeMantenimientoDeEquipoService.findById(registroId);
      await registro.setEquipoInformatico(equipoId);
      await oficina.save();
      res.sendSuccess('success');
    } catch (error) {
      res.sendError(`Error al querer asignarle un registro al equipo, ${error}`);
    }
  }

}
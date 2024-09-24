import { where } from 'sequelize';
import { equipoInformaticoService } from '../services/service.js';
import GenericController from './helper/generic.controller.js';

// Crear un nuevo usuario
export default class EquipoInformaticoController extends GenericController {
  constructor(service) {
    super(service);
  }

  async addEquipo(req, res) {
    const { userId = null, oficinaId = null, equipoId = null } = req.query;
    try {
      const equipo = await equipoInformaticoService.findById(equipoId);
      if (equipo.estado == 'DISPONIBLE') {
        userId ? await equipo.setEmpleado(userId) : await equipo.setOficina(oficinaId);
        equipo.estado = 'ASIGNADO';
        await equipo.save();
        res.sendSuccess('success');
      }
      res.sendError(`El equipo ya se encuentra asignado, ${error}`);
    } catch (error) {
      res.sendError(`Error al querer asignar equipo el equipo, ${error}`);
    }
  }

  async removeEquipo(req, res) {
    const equipoId = req.query.eid;
    try {
      const equipo = await equipoInformaticoService.findById(equipoId);
      await equipo.setEmpleado(null);
      await equipo.setOficina(null);
      equipo.estado = 'DISPONIBLE';
      await equipo.save();
      res.sendSuccess('success');
    } catch (error) {
      res.sendError(`Error al querer remover el equipo, ${error}`);
    }
  }

  async setEstadoBaja(req, res) {
    // const { nuevoEstado = 'BAJA' } = req.query.estado; //ENUM: 'ASIGNADO', 'DISPONIBLE', 'BAJA'
    const equipoId = req.query.eid;
    try {
      await equipoInformaticoService.update(equipoId, { estado: 'BAJA' });
      res.sendSuccess('success');
    } catch (error) {
      res.sendError(`Error al querer actualizar el equipo, ${error}`);
    }
  }


}
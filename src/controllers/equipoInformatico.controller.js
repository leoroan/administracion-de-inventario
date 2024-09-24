import { where } from 'sequelize';
import { equipoInformaticoService } from '../services/service.js';
import GenericController from './helper/generic.controller.js';
import { Empleado } from '../services/db/models/Empleado.model.js';

// Crear un nuevo usuario
export default class EquipoInformaticoController extends GenericController {
  constructor(service) {
    super(service);
  }

  async addEquipo(req, res) {
    const { userId = null, oficinaId = null, equipoId = null } = req.query;
    try {
      const equipo = await equipoInformaticoService.findById(equipoId);
      if (!equipo) {
        return res.sendError({ message: 'Equipo no encontrado' });
      }
      if (equipo.estado == 'DISPONIBLE') {
        userId ? await equipo.setEmpleado(userId) : await equipo.setOficina(oficinaId);
        equipo.estado = 'ASIGNADO';
        await equipo.save();
        res.sendSuccess(equipo);
      }
      res.sendError({ message: 'El equipo ya se encuentra asignado' });
    } catch (error) {
      res.sendError({ message: 'Error al querer asignar equipo el equipo' });
    }
  }

  async removeEquipo(req, res) {
    const equipoId = req.query.eid;
    try {
      const equipo = await equipoInformaticoService.findById(equipoId);
      if (!equipo) {
        return res.sendError({ message: 'Equipo no encontrado' });
      }
      await equipo.setEmpleado(null);
      await equipo.setOficina(null);
      equipo.estado = 'DISPONIBLE';

      await equipo.save();
      res.sendSuccess(equipo);
    } catch (error) {
      res.sendError({ message: 'Error al querer remover el equipo' });
    }
  }

  async setEstadoBaja(req, res) {
    // const { nuevoEstado = 'BAJA' } = req.query.estado; //ENUM: 'ASIGNADO', 'DISPONIBLE', 'BAJA'
    const equipoId = req.query.eid;
    try {
      await equipoInformaticoService.update(equipoId, { estado: 'BAJA' });
      res.sendSuccess({ message: 'Estado actualizado' });
    } catch (error) {
      res.sendError({ message: 'Error al actualizar el estado' });
    }
  }


}
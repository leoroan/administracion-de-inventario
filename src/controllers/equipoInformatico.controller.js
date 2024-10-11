import { equipoInformaticoService, trazabilidadService } from '../services/service.js';
import GenericController from './helper/generic.controller.js';
import { sendPDFViaEmail } from './pdf.controller.js';

// Crear un nuevo usuario
export default class EquipoInformaticoController extends GenericController {
  constructor(service) {
    super(service);
  }

  async addEquipo(req, res) {
    const { userId = null, oficinaId = null, equipoId = null } = req.query;
    try {
      const equipo = await equipoInformaticoService.findById(equipoId, 'conEmpleado,conOficina');
      if (equipo.estado !== 'DISPONIBLE') {
        throw new Error(`El equipo ya se encuentra asignado`);
      }
      userId ? await equipo.setEmpleado(userId) : await equipo.setOficina(oficinaId);
      equipo.estado = 'ASIGNADO';
      await equipo.save();
      const traza = await trazabilidadService.addTraza(userId, oficinaId, equipoId, 'SE ASIGNÓ', req.user.username);
      sendPDFViaEmail(req, res, traza);
      // res.sendSuccess(equipo);
    } catch (error) {
      res.sendError(`al querer asignar el equipo, ${error}`);
    }
  }

  async removeEquipo(req, res) {
    const { equipoId } = req.query;
    try {
      const equipo = await equipoInformaticoService.findById(equipoId, 'conEmpleado,conOficina');
      await equipo.setEmpleado(null);
      await equipo.setOficina(null);
      equipo.estado = 'DISPONIBLE';
      await equipo.save();
      const userId = equipo.dataValues.Empleado?.id || null;
      const oficinaId = equipo.dataValues.Oficina?.id || null;
      await trazabilidadService.addTraza(userId, oficinaId, equipoId, 'SE RETIRÓ, EN DISPONIBILIDAD.', req.user.username);
      res.sendSuccess('success');
    } catch (error) {
      res.sendError(`al querer remover el equipo, ${error}`);
    }
  }

  async setEstadoBaja(req, res) {
    // const { nuevoEstado = 'BAJA' } = req.query.estado; //ENUM: 'ASIGNADO', 'DISPONIBLE', 'BAJA'
    const { equipoId } = req.query;
    try {
      await equipoInformaticoService.update(equipoId, { estado: 'BAJA' });
      res.sendSuccess('success');
    } catch (error) {
      res.sendError(`al querer actualizar el equipo, ${error}`);
    }
  }


}
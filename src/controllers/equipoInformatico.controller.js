import { where } from 'sequelize';
import { equipoInformaticoService } from '../services/service.js';
import GenericController from './helper/generic.controller.js';
import { Empleado } from '../services/db/models/Empleado.model.js';

// Crear un nuevo usuario
export default class EquipoInformaticoController extends GenericController {
  constructor(service) {
    super(service);
  }

  async obtenerTodosLosEquiposConSusEmpleados(req, res) {
    try {
      const equipos = await equipoInformaticoService.findAll_withEmpleadoDTO();
      res.sendSuccess(equipos);
    } catch (error) {
      res.sendError({ message: 'Error al obtener equipos con empleados' });
    }
  }

  async obtenerUnEquipoConSuEmpleadoPorEquipoId(req, res) {
    const equipoId = req.query.eid;
    try {
      const equipo = await equipoInformaticoService.findById_withEmpleadoDTO(equipoId);
      res.sendSuccess(equipo);
    } catch (error) {
      res.sendError({ message: 'Error al obtener el equipo del empleado' });
    }
  }

  async addEquipoToEmpleado(req, res) {
    const userId = req.query.uid;
    const equipoId = req.query.eid;
    try {
      const equipo = await equipoInformaticoService.findById(equipoId);
      if (!equipo) {
        return res.sendError({ message: 'Equipo no encontrado' });
      }
      if (!equipo.oficinaId) {
        equipo.empleadoId = userId;
        await equipo.save();
        res.sendSuccess(equipo);
      }
      res.sendError({ message: 'El equipo ya esta asignado a una oficina' });

    } catch (error) {
      res.sendError({ message: 'Error al querer asignar equipo al empleado' });
    }
  }

  async addEquipoToOficina(req, res) {
    const oficinaId = req.query.oid;
    const equipoId = req.query.eid;
    try {
      const equipo = await equipoInformaticoService.findById(equipoId);
      if (!equipo) {
        return res.sendError({ message: 'Equipo no encontrado' });
      }
      if (!equipo.empleadoId) {
        equipo.oficinaId = oficinaId;
        await equipo.save();
        res.sendSuccess(equipo);
      }
      res.sendError({ message: 'El equipo ya esta asignado a un empleado' });
    } catch (error) {
      res.sendError({ message: 'Error al querer asignar equipo a la oficina' });
    }
  }
}
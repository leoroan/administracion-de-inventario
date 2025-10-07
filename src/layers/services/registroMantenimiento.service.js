import GenericService from './helper/generic.service.js';
import { BadRequest, NotFound } from '../../config/error/errors.js';
import services from './servicesLoader.js';

export default class RegistroMantenimientoService extends GenericService {
  constructor(dao) {
    super(dao);
  }

  async asignarEquipo(registroId, equipoId) {
    if (!registroId || !equipoId) {
      throw new BadRequest('registroId y equipoId son requeridos');
    }

    const registro = await this.dao.findById(registroId);
    if (!registro) {
      throw new NotFound('Registro de mantenimiento no encontrado');
    }

    const equipo = await services.equipoinformaticoService.findById(equipoId);
    if (!equipo) {
      throw new NotFound('Equipo informático no encontrado');
    }

    await registro.setEquipo(equipo);
    return registro;
  }

  async crearRegistroConEquipo(registroData, equipoId) {
    if (!registroData || !equipoId) {
      throw new BadRequest('registroData y equipoId son requeridos');
    }
    const equipo = await services.equipoinformaticoService.findById(equipoId);
    if (!equipo) {
      throw new NotFound('Equipo informático no encontrado');
    }
    const registro = await this.dao.create({
      ...registroData,
      equipoId: equipoId
    });
    return registro;
  }

  async desasignarEquipo(registroId) {
    if (!registroId) {
      throw new BadRequest('registroId es requerido');
    }
    const registro = await this.dao.findById(registroId);
    if (!registro) {
      throw new NotFound('Registro de mantenimiento no encontrado');
    }
    await this.dao.delete(registro);
    return registro;
  }
}
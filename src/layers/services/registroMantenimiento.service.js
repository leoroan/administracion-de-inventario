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
}
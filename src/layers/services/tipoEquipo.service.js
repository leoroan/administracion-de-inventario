import GenericService from './helper/generic.service.js';
import { BadRequest, NotFound } from '../../config/error/errors.js';
import services from '../../layers/services/servicesLoader.js';
export default class TipoEquipoService extends GenericService {
  constructor(dao) {
    super(dao);
  }

  async asignarEquipo(tipoEquipoId, equipoId) {
    const tipoEquipo = await this.dao.findByPk(tipoEquipoId);
    if (!tipoEquipo) {
      throw new NotFound('TipoEquipo no encontrado');
    }
    const equipo = await services.equipoinformaticoService.findById(equipoId);
    if (!equipo) {
      throw new NotFound('Equipo no encontrado');
    }
    await tipoEquipo.addEquipo(equipo);
    return equipo;
  }

  async asignarEquipos(tipoEquipoId, equiposIds) {
    const tipoEquipo = await this.dao.findByPk(tipoEquipoId);
    if (!tipoEquipo) {
      throw new NotFound('TipoEquipo no encontrado');
    }
    if (!Array.isArray(equiposIds)) {
      throw new BadRequest('los ids de equipos deben ser un array');
    }
    if (equiposIds.length === 0) {
      throw new BadRequest('El array de equipos no puede estar vacío');
    }
    const equipos = await services.equipoinformaticoService.findAll({
      where: { id: equiposIds }
    });
    if (equipos.length !== equiposIds.length) {
      throw new BadRequest('Uno o más equipos no existen');
    }
    await tipoEquipo.setEquipos(equipos);
    return tipoEquipo;
  }
}
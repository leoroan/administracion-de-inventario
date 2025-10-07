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

  async desasignarEquipo(tipoEquipoId, equipoId) {
    const tipoEquipo = await this.dao.findByPk(tipoEquipoId);
    if (!tipoEquipo) {
      throw new NotFound('TipoEquipo no encontrado');
    }
    const equipo = await services.equipoinformaticoService.findById(equipoId);
    if (!equipo) {
      throw new NotFound('Equipo no encontrado');
    }
    await tipoEquipo.removeEquipo(equipo);
    return equipo;
  }

  async asignarEquipos(tipoEquipoId, equiposIds) {
    if (!tipoEquipoId) {
      throw new BadRequest('Debe indicar un id de tipoEquipo');
    }
    if (!Array.isArray(equiposIds)) {
      throw new BadRequest('los ids de equipos deben ser un array');
    }
    if (equiposIds.length === 0) {
      throw new BadRequest('El array de equipos no puede estar vacío');
    }
    const tipoEquipo = await this.dao.findByPk(tipoEquipoId);
    if (!tipoEquipo) {
      throw new NotFound('TipoEquipo no encontrado');
    }
    const equipos = await services.equipoinformaticoService.findAll({
      where: { id: equiposIds }
    });
    const encontrados = equipos.map(u => u.id);
    const faltantes = equiposIds.filter(id => !encontrados.includes(id));
    if (faltantes.length !== equiposIds.length) {
      throw new BadRequest('Uno o más equipos no existen');
    }
    await tipoEquipo.setEquipos(equipos);
    return tipoEquipo;
  }
}
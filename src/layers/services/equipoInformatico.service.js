import GenericService from './helper/generic.service.js';
import { BadRequest, NotFound } from '../../config/error/errors.js';
import services from './servicesLoader.js';

export default class EquipoInformaticoService extends GenericService {
  constructor(dao) {
    super(dao);
  }

  async asignarOficina(equipoId, oficinaId) {
    const equipo = await this.dao.findById(equipoId);
    if (!equipo) {
      throw new NotFound('Equipo no encontrado');
    }
    const oficina = await services.oficinaService.findById(oficinaId);
    if (!oficina) throw new NotFound(`Oficina con ID ${oficinaId} no encontrada`);
    await equipo.setOficina(oficina);
    return equipo;
  }

  async removerOficina(equipoId) {
    const equipo = await this.dao.findById(equipoId);
    if (!equipo) {
      throw new NotFound('Equipo no encontrado');
    }
    await equipo.setOficina(null);
    return equipo;
  }

  async agregarEmpleadoAsignado(equipoId, empleadoId) {
    const equipo = await this.dao.findById(equipoId);
    if (!equipo) {
      throw new NotFound('Equipo no encontrado');
    }
    const empleado = await services.empleadoService.findById(empleadoId);
    if (!empleado) {
      throw new NotFound(`Empleado con ID ${empleadoId} no encontrado`);
    }
    await equipo.setEmpleadoAsignado(empleado);
    return equipo;
  }

  async removerEmpleadoAsignado(equipoId) {
    const equipo = await this.dao.findById(equipoId);
    if (!equipo) {
      throw new NotFound('Equipo no encontrado');
    }
    await equipo.setEmpleadoAsignado(null);
    return equipo;
  }

  async agregarRegistroMantenimiento(equipoId, registroData) {
    const equipo = await this.dao.findById(equipoId);
    if (!equipo) {
      throw new NotFound('Equipo no encontrado');
    }
    await equipo.createRegistroMantenimiento(registroData);
    return registroData;
  }

  async removerRegistroMantenimiento(equipoId, registroId) {
    const equipo = await this.dao.findById(equipoId);
    if (!equipo) {
      throw new NotFound('Equipo no encontrado');
    }
    const registro = await services.registroMantenimientoService.findById(registroId);
    if (!registro) {
      throw new NotFound(`Registro de mantenimiento con ID ${registroId} no encontrado`);
    }
    await services.registroMantenimientoService.delete(registro);
    return equipo;
  }

  async asignarTipoequipo(equipoId, tipoId) {
    const equipo = await this.dao.findById(equipoId);
    if (!equipo) {
      throw new NotFound('Equipo no encontrado');
    }
    const tipoequipo = await services.tipoequipoService.findById(tipoId);
    if (!tipoequipo) {
      throw new NotFound(`Tipo de equipo con ID ${tipoId} no encontrado`);
    }
    await equipo.setTipoequipo(tipoequipo);
    return equipo;
  }

  async asignarModelo(equipoId, modeloId) {
    const equipo = await this.dao.findById(equipoId);
    if (!equipo) {
      throw new NotFound('Equipo no encontrado');
    }
    const modelo = await services.modeloService.findById(modeloId);
    if (!modelo) {
      throw new NotFound(`Modelo con ID ${modeloId} no encontrado`);
    }
    await equipo.setModelo(modelo);
    return equipo;
  }
}
import GenericService from './helper/generic.service.js';
import { BadRequest, NotFound } from '../../config/error/errors.js';
import services from './servicesLoader.js';
import { sequelize } from '../../config/db/sequelize.config.js';

export default class EquipoInformaticoService extends GenericService {
  constructor(dao) {
    super(dao);
  }

  async asignarOficina(equipoId, oficinaId) {
    const t = await sequelize.transaction();
    try {
      const oficina = await services.oficinaService.findById(oficinaId);
      if (!oficina) throw new NotFound('Oficina no encontrada');
      const equipo = await this.dao.findById(equipoId);
      if (!equipo) throw new NotFound('Equipo informático no encontrado');

      if (equipo.empleadoId || equipo.oficinaId) {
        throw new BadRequest(`El equipo ${equipoId} ya está asignado.`);
      }
      if (equipo.disponibilidad !== 'disponible') {
        throw new BadRequest(`El equipo ${equipoId} no está disponible (disponibilidad: ${equipo.disponibilidad}).`);
      }

      await oficina.addEquipo(equipo, { transaction: t });
      await equipo.update({ estado: 'activo', disponibilidad: 'asignado' }, { transaction: t });

      await t.commit();
      return { oficina, equipo };
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  async removerEquipo(idOficina, idEquipo) {
    const t = await sequelize.transaction();
    try {
      const oficina = await this.dao.findById(idOficina);
      if (!oficina) throw new NotFound('Oficina no encontrada');
      const equipo = await services.equipoinformaticoService.findById(idEquipo);
      if (!equipo) throw new NotFound('Equipo informático no encontrado');

      await oficina.removeEquipo(equipo, { transaction: t });
      await equipo.update({ estado: 'activo', disponibilidad: 'disponible' }, { transaction: t });

      await t.commit();
      return { oficina, equipo };
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  async agregarEmpleadoAsignado(empleadoId, equipoId) {
    const t = await sequelize.transaction();
    try {
      const empleado = await services.usuarioService.findById(empleadoId);
      if (!empleado) throw new NotFound(`Empleado con ID ${empleadoId} no encontrado`);
      const equipo = await this.dao.findById(equipoId);
      if (!equipo) throw new NotFound(`Equipo con ID ${equipoId} no encontrado`);

      if (equipo.empleadoId || equipo.oficinaId) {
        throw new BadRequest(`El equipo ${equipoId} ya está asignado.`);
      }
      if (equipo.disponibilidad !== 'disponible') {
        throw new BadRequest(`El equipo ${equipoId} no está disponible (disponibilidad: ${equipo.disponibilidad}).`);
      }

      await empleado.addEquiposAsignado(equipo, { transaction: t });
      await equipo.update({ estado: 'activo', disponibilidad: 'asignado' }, { transaction: t });

      await t.commit();
      return { equipo, empleado };
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  async removerEmpleadoAsignado(empleadoId, equipoId) {
    const t = await sequelize.transaction();
    try {
      const empleado = await services.usuarioService.findById(empleadoId);
      if (!empleado) throw new NotFound(`Empleado con ID ${empleadoId} no encontrado`);
      const equipo = await this.dao.findById(equipoId);
      if (!equipo) throw new NotFound(`Equipo con ID ${equipoId} no encontrado`);

      await empleado.removeEquiposAsignado(equipo, { transaction: t });
      await equipo.update({ estado: 'activo', disponibilidad: 'disponible' }, { transaction: t });

      await t.commit();
      return { empleado, equipo };
    } catch (err) {
      await t.rollback();
      throw err;
    }
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
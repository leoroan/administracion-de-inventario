import { EquipoInformatico } from "../models/EquipoInformatico.model.js";
import CustomError from '../../../utils/custom.error.js';

export default class EquipoInformaticoDao {
  async createEquipoInformatico(marca, numeroDeSerie, modelo, numeroDePatrimonio, estado, observacion, especificacionesTecnicas, precio) {
    try {
      const equipoInformatico = await EquipoInformatico.create({ marca, numeroDeSerie, modelo, numeroDePatrimonio, estado, observacion, especificacionesTecnicas, precio }, { transaction: t });
      return equipoInformatico;
    } catch (error) {
      throw CustomError.handleSequelizeError(error, 'Error al crear el equipo');
    }
  }

  async getAllEquipoInformaticos() {
    try {
      // const equipoInformaticos = await EquipoInformatico.findAll({ include: { all: true,  include: { all: true } } });
      const equipoInformaticos = await EquipoInformatico.findAll({ include: { all: true, nested: true } });
      return equipoInformaticos;
    } catch (error) {
      throw new CustomError(500, 'Error al obtener los equipos', error);
    }
  }

  async getEquipoInformaticoById(id) {
    try {
      const equipoInformatico = await EquipoInformatico.findByPk(id, { include: { all: true } });
      if (!equipoInformatico) {
        throw new CustomError(404, 'Equipo no encontrado');
      }
      return equipoInformatico;
    } catch (error) {
      throw CustomError.handleSequelizeError(error, `No se encontró ningún equipo con el ID ${id}`);
    }
  }

  async updateEquipoInformatico(id, updatedData) {
    try {
      const equipoInformatico = await EquipoInformatico.findByPk(id);
      if (!equipoInformatico) {
        throw new CustomError(404, 'Equipo no encontrado');
      }
      await equipoInformatico.update(updatedData);
      return equipoInformatico;
    } catch (error) {
      throw CustomError.handleSequelizeError(error, 'Error al actualizar el equipo');
    }
  }

  async deleteEquipoInformatico(id) {
    try {
      const equipoInformatico = await EquipoInformatico.findByPk(id);
      if (!equipoInformatico) {
        throw new CustomError(404, 'Equipo no encontrado');;
      }
      await equipoInformatico.destroy();
      return true;
    } catch (error) {
      throw CustomError.handleSequelizeError(error, 'Error al querer eliminar el equipo');
    }
  }

  async findDeletedEquipoInformaticoByNumeroDeSerie(numeroDeSerie) {
    try {
      const equipoInformatico = await EquipoInformatico.findOne({ where: { numeroDeSerie: numeroDeSerie }, include: { all: true }, paranoid: false });
      if (!equipoInformatico) {
        throw new CustomError(404, 'Equipo eliminado no encontrado con ese numero de serie');
      }
      if (!equipoInformatico.deletedAt) {
        throw new CustomError(401, 'El equipo no está eliminado');
      }
      return equipoInformatico;
    } catch (error) {
      throw CustomError.handleSequelizeError(error, `Error al buscar un equipo eliminado por numero de serie ${dni}`);
    }
  }

  async getAllDeletedEquipoInformatico() {
    try {
      const equipoInformatico = await EquipoInformatico.findAll({ paranoid: false });
      const equipoInformaticoEliminados = equipoInformatico.filter(equipo => equipo.deletedAt !== null);
      if (equipoInformaticoEliminados.length === 0) {
        throw new CustomError(404, 'No se encontraron equipos eliminados');
      }
      return equipoInformaticoEliminados;
    } catch (error) {
      throw CustomError.handleSequelizeError(error, 'Error al buscar equipos eliminados');
    }
  }

  async restoreEquipoInformaticoById(id) {
    try {
      const equipoInformatico = await EquipoInformatico.findByPk(id, { paranoid: false });
      if (!equipoInformatico) {
        throw new CustomError(404, 'Equipo no encontrado');
      }
      if (!equipoInformatico.deletedAt) {
        throw new CustomError(405, 'El equipo no está eliminado');
      }
      await equipoInformatico.restore();
      return equipoInformatico;
    } catch (error) {
      throw CustomError.handleSequelizeError(error, `No se encontró ningún equipo borrado con el ID ${id}`);
    }
  }
}





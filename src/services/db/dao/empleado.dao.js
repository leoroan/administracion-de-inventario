// import CustomError from '../../../utils/custom.error.js';
import { Empleado } from '../models/Empleado.model.js';
import DaoService from './helper/DAO.service.js';

const daoService = new DaoService(Empleado);
export default class EmpleadoDao {

  async createEmpleado(obj) {
    return await daoService.create(obj);
  }
  async getEmpleadoById(id) {
    return await daoService.getById(id);
  }
  async getAllEmpleados() {
    return await daoService.getAll();
  }
  async updateEmpleado(id, updatedData) {
    return await daoService.update(id, updatedData);
  }
  async deleteEmpleado(id) {
    return await daoService.delete(id);
  }
  async findDeletedEmpleadoByDni(dni) {
    return await daoService.findDeletedBy("dni", dni);
  }
  async getAllDeletedEmpleados() {
    return await daoService.getAllDeleted();
  }
  async restoreEmpleadoById(id) {
    return await daoService.restoreById(id);
  }
}

// async createEmpleado(obj) {
//   try {
//     const empleado = await Empleado.create({ obj });
//     return empleado;
//   } catch (error) {
//     throw CustomError.handleSequelizeError(error, 'Error al crear empleado');
//   }
// }

// async getEmpleadoById(id) {
//   try {
//     const empleado = await Empleado.findByPk(id, { include: { all: true } });
//     if (!empleado) {
//       throw new CustomError(404, 'Empleado no encontrado');
//     }
//     return empleado;
//   } catch (error) {
//     throw CustomError.handleSequelizeError(error, `No se encontró ningún empleado con el ID ${id}`);
//   }
// }

// async getAllEmpleados() {
//   try {
//     const empleados = await Empleado.findAll({ include: { all: true } });
//     return empleados;
//   } catch (error) {
//     throw new CustomError(500, 'Error al obtener empleados', error);
//   }
// }

// async updateEmpleado(id, updatedData) {
//   try {
//     const empleado = await Empleado.findByPk(id);
//     if (!empleado) {
//       throw new CustomError(404, `Error al actualizar, el ID: ${id} no es correcto o no se encuentra`);
//     }
//     await empleado.update(updatedData);
//     return empleado;
//   } catch (error) {
//     throw CustomError.handleSequelizeError(error, 'Error al actualizar el empleado');
//   }
// }

// async deleteEmpleado(id) {
//   try {
//     const empleado = await Empleado.findByPk(id);
//     if (!empleado) {
//       throw new CustomError(404, 'Empleado no encontrado');
//     }
//     await empleado.destroy();
//     return true;
//   } catch (error) {
//     throw CustomError.handleSequelizeError(error, 'Error al querer eliminar el empleado');
//   }
// }

// async findDeletedEmpleadoByDni(dni) {
//   try {
//     const empleado = await Empleado.findOne({ where: { dni: dni }, include: { all: true }, paranoid: false });
//     if (!empleado) {
//       throw new CustomError(404, 'Empleado eliminado no encontrado con ese DNI');
//     }
//     if (!empleado.deletedAt) {
//       throw new CustomError(401, 'El empleado no está eliminado');
//     }
//     return empleado;
//   } catch (error) {
//     throw CustomError.handleSequelizeError(error, `Error al buscar empleado eliminado por DNI ${dni}`);
//   }
// }

// async getAllDeletedEmpleados() {
//   try {
//     const empleados = await Empleado.findAll({ paranoid: false });
//     const empleadosEliminados = empleados.filter(empleado => empleado.deletedAt !== null);
//     if (empleadosEliminados.length === 0) {
//       throw new CustomError(404, 'No se encontraron empleados eliminados');
//     }
//     return empleadosEliminados;
//   } catch (error) {
//     throw CustomError.handleSequelizeError(error, 'Error al buscar empleados eliminados');
//   }
// }

// async restoreEmpleadoById(id) {
//   try {
//     const empleado = await Empleado.findByPk(id, { paranoid: false });
//     if (!empleado) {
//       throw new CustomError(404, 'Empleado no encontrado');
//     }
//     if (!empleado.deletedAt) {
//       throw new CustomError(405, 'El empleado no está eliminado');
//     }
//     await empleado.restore();
//     return empleado;
//   } catch (error) {
//     throw CustomError.handleSequelizeError(error, `No se encontró ningún empleado borrado con el ID ${id}`);
//   }
// }



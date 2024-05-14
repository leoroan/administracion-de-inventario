import CustomError from '../../../utils/custom.error.js';
import { Empleado } from '../models/Empleado.model.js';


async function createEmpleado(nombre, apellido, telefono, dni, rol, email) {
  try {
    const empleado = await Empleado.create({ nombre, apellido, telefono, dni, rol, email });
    return empleado;
  } catch (error) {
    throw CustomError.handleSequelizeError(error, 'Error al crear empleado');
  }
}

async function getEmpleadoById(id) {
  try {
    const empleado = await Empleado.findByPk(id, { include: { all: true } });
    if (!empleado) {
      throw new CustomError(401, 'Empleado no encontrado');
    }
    return empleado;
  } catch (error) {
    throw CustomError.handleSequelizeError(error, `No se encontró ningún empleado con el ID ${id}`);
  }
}

async function getAllEmpleados() {
  try {
    const empleados = await Empleado.findAll({ include: { all: true } });
    return empleados;
  } catch (error) {
    throw new CustomError(500, 'Error al obtener empleados', error);
  }
}

async function updateEmpleado(id, updatedData) {
  try {
    const empleado = await Empleado.findByPk(id);
    if (!empleado) {
      throw new CustomError(404, `Error al actualizar, el ID: ${id} no es correcto o no se encuentra`);
    }
    await empleado.update(updatedData);
    return empleado;
  } catch (error) {
    throw CustomError.handleSequelizeError(error, 'Error al actualizar el empleado');
  }
}

async function deleteEmpleado(id) {
  try {
    const empleado = await Empleado.findByPk(id);
    if (!empleado) {
      throw new CustomError(401, 'Empleado no encontrado');
    }
    await empleado.destroy();
    return true;
  } catch (error) {
    throw CustomError.handleSequelizeError(error, 'Error al querer eliminar el empleado');
  }
}

async function findDeletedEmpleadoByDni(dni) {
  try {
    const empleado = await Empleado.findOne({ where: { dni: dni }, paranoid: false });
    if (!empleado) {
      throw new CustomError(404, 'Empleado eliminado no encontrado con ese DNI');
    }
    return empleado;
  } catch (error) {
    throw CustomError.handleSequelizeError(error, 'Error al buscar empleado eliminado por DNI ${id}');
  }
}

async function getAllDeletedEmpleados() {
  try {
    const empleados = await Empleado.findAll({ paranoid: false });
    const empleadosEliminados = empleados.filter(empleado => empleado.deletedAt !== null);
    if (empleadosEliminados.length === 0) {
      throw new CustomError(404, 'No se encontraron empleados eliminados');
    }
    return empleadosEliminados;
  } catch (error) {
    throw CustomError.handleSequelizeError(error, 'Error al buscar empleados eliminados');
  }
}


export {
  getAllEmpleados,
  createEmpleado,
  getEmpleadoById,
  updateEmpleado,
  deleteEmpleado,
  findDeletedEmpleadoByDni,
  getAllDeletedEmpleados
};

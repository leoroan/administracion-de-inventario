import CustomError from '../../../utils/custom.error.js';
import { Empleado } from '../models/Empleado.model.js';

async function createEmpleado(nombre, apellido, telefono, dni, rol, email) {
  try {
    const empleado = await Empleado.create({ nombre, apellido, telefono, dni, rol, email });
    return empleado;
  } catch (error) {
    throw new CustomError('Error al crear empleado', error.original.detail);
  }
}

async function getEmpleadoById(id) {
  try {
    const empleado = await Empleado.findByPk(id, { include: { all: true } });
    if (!empleado) {
      throw new CustomError('Empleado no encontrado');
    }
    return empleado;
  } catch (error) {
    console.log(error);
    throw new CustomError(error, `No se encontró ningún empleado con el ID ${id}`);
  }
}

async function getAllEmpleados() {
  try {
    const empleados = await Empleado.findAll({ include: { all: true } });
    return empleados;
  } catch (error) {
    throw new CustomError('Error al obtener todos los empleados: ' + error.message, error);
  }
}

async function updateEmpleado(id, updatedData) {
  try {
    const empleado = await Empleado.findByPk(id);
    if (!empleado) {
      throw new CustomError('Empleado no encontrado para actualizar, ID:' + id);
    }
    await empleado.update(updatedData);
    return empleado;
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new CustomError(error, error.original.detail);
    } else {
      throw new CustomError(error);
    }
  }
}

async function deleteEmpleado(id) {
  try {
    const empleado = await Empleado.findByPk(id);
    if (!empleado) {
      throw new CustomError('No se encontró ningún empleado con el ID ' + id);
    }
    await empleado.destroy();
    return true;
  } catch (error) {
    throw new CustomError(error);
  }
}

export { getAllEmpleados, createEmpleado, getEmpleadoById, updateEmpleado, deleteEmpleado };

import { Empleado } from '../models/Empleado.model.js';

async function createEmpleado(nombre, apellido, dni, rol, email) {
  try {
    const empleado = await Empleado.create({ nombre, apellido, dni, rol, email });
    return empleado;
  } catch (error) {
    throw new Error('Error al crear empleado: ' + error.message);
  }
}

async function getEmpleadoById(id) {
  try {
    const empleado = await Empleado.findByPk(id, { include: { all: true } });
    if (!empleado) {
      throw new Error('No se encontró ningún empleado con el ID ' + id);
    }
    return empleado;
  } catch (error) {
    throw new Error('Error al obtener empleado por ID: ' + error.message);
  }
}

async function getAllEmpleados() {
  try {
    const empleados = await Empleado.findAll({ include: { all: true } });
    return empleados;
  } catch (error) {
    throw new Error('Error al obtener todos los empleados: ' + error.message);
  }
}

async function updateEmpleado(id, updatedData) {
  try {
    const empleado = await Empleado.findByPk(id);
    if (!empleado) {
      throw new Error('No se encontró ningún empleado con el ID ' + id);
    }
    await empleado.update(updatedData);
    return empleado;
  } catch (error) {
    throw new Error('Error al actualizar empleado: ' + error.message);
  }
}

async function deleteEmpleado(id) {
  try {
    const empleado = await Empleado.findByPk(id);
    if (!empleado) {
      throw new Error('No se encontró ningún empleado con el ID ' + id);
    }
    await empleado.destroy();
    return true;
  } catch (error) {
    throw new Error('Error al eliminar empleado: ' + error.message);
  }
}

export { getAllEmpleados, createEmpleado, getEmpleadoById, updateEmpleado, deleteEmpleado };

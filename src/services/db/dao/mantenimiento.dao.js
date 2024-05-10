import { MantenimientoDeEquipo } from '../models/MantenimientoDeEquipo.model.js';

async function createMantenimiento(req, res) {
  try {
    const mantenimiento = new MantenimientoDeEquipo(req.body);
    return mantenimiento;
  } catch (error) {
    throw new Error('Error creating maintenance history: ' + error.message);
  }
}

async function getMantenimientoById(id) {
  try {
    const mantenimiento = await MantenimientoDeEquipo.findByPk(id);
    if (!mantenimiento) {
      throw new Error('maintenance history not found');
    }
    return mantenimiento;
  } catch (error) {
    throw new Error('Error getting maintenance history: ' + error.message);
  }
}

async function updateMantenimiento(id, updatedData) {
  try {
    const mantenimiento = await MantenimientoDeEquipo.findByPk(id);
    if (!mantenimiento) {
      throw new Error('maintenance history not found');
    }
    await mantenimiento.update(updatedData);
    return mantenimiento;
  } catch (error) {
    throw new Error('Error updating maintenance history: ' + error.message);
  }
}

async function deleteMantenimiento(id) {
  try {
    const mantenimiento = await MantenimientoDeEquipo.findByPk(id);
    if (!mantenimiento) {
      throw new Error('maintenance history not found');
    }
    await mantenimiento.destroy();
    return true;
  } catch (error) {
    throw new Error('Error deleting maintenance history: ' + error.message);
  }
}

export {
  createMantenimiento,
  updateMantenimiento,
  deleteMantenimiento,
  getMantenimientoById
}
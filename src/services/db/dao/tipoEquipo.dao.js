import { TipoEquipo } from "../models/TipoEquipo.model.js"

async function createTipoEquipo(nombre) {
  try {
    const tipoEquipo = await TipoEquipo.create({ nombre });
    return tipoEquipo;
  } catch (error) {
    throw new Error('Error creating hardware type: ' + error.message);
  }
}

async function getAllTipoEquipo() {
  try {
    const tipoEquipos = await TipoEquipo.findAll();
    return tipoEquipos;
  } catch (error) {
    throw new Error('Error fetching hardware types: ' + error.message);
  }
}

async function getTipoEquipoById(id) {
  try {
    const tipoEquipo = await TipoEquipo.findByPk(id);
    return tipoEquipo;
  } catch (error) {
    throw new Error('Error fetching hardware type: ' + error.message);
  }
}

async function updateTipoEquipo(id, updatedData) {
  try {
    const tipoEquipo = await TipoEquipo.findByPk(id);
    if (!tipoEquipo) {
      throw new Error('hardware type not found');
    }
    await tipoEquipo.update(updatedData);
    return tipoEquipo;
  } catch (error) {
    throw new Error('Error updating hardware type: ' + error.message);
  }
}

async function deleteTipoEquipo(id) {
  try {
    const tipoEquipo = await TipoEquipo.findByPk(id);
    if (!tipoEquipo) {
      throw new Error('hardware type not found');
    }
    await tipoEquipo.destroy();
    return true;
  } catch (error) {
    throw new Error('Error deleting hardware type: ' + error.message);
  }
}

export { createTipoEquipo, getTipoEquipoById, updateTipoEquipo, deleteTipoEquipo, getAllTipoEquipo };

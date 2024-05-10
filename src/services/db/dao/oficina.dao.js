import { Oficina } from "../models/Oficina.model.js"

async function createOficina(nombre, descripcion, telefono, email) {
  try {
    const oficina = await Oficina.create({ nombre, descripcion, telefono, email });
    return oficina;
  } catch (error) {
    throw new Error('Error creating office: ' + error.message);
  }
}

async function getAllOficinas() {
  try {
    const oficinas = await Oficina.findAll({ include: { all: true } });
    return oficinas;
  } catch (error) {
    throw new Error('Error fetching offices: ' + error.message);
  }
}

async function getOficinaById(id) {
  try {
    const oficina = await Oficina.findByPk(id, { include: { all: true } });
    return oficina;
  } catch (error) {
    throw new Error('Error fetching office: ' + error.message);
  }
}

async function updateOficina(id, updatedData) {
  try {
    const oficina = await Oficina.findByPk(id);
    if (!oficina) {
      throw new Error('office not found');
    }
    await oficina.update(updatedData);
    return oficina;
  } catch (error) {
    throw new Error('Error updating office: ' + error.message);
  }
}

async function deleteOficina(id) {
  try {
    const oficina = await Oficina.findByPk(id);
    if (!oficina) {
      throw new Error('office not found');
    }
    await oficina.destroy();
    return true;
  } catch (error) {
    throw new Error('Error deleting office: ' + error.message);
  }
}

export { createOficina, getAllOficinas, getOficinaById, updateOficina, deleteOficina };

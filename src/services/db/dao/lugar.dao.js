import { Lugar } from "../models/Lugar.model.js"

async function createLugar(nombre, calle, altura, comentario) {
  try {
    const lugar = await Lugar.create({ nombre, calle, altura, comentario });
    return lugar;
  } catch (error) {
    throw new Error('Error creating place: ' + error.message);
  }
}
async function getAllLugares() {
  try {
    const lugares = await Lugar.findAll({ include: { all: true } });
    return lugares;
  } catch (error) {
    throw new Error('Error fetching places: ' + error.message);
  }
}

async function getLugarById(id) {
  try {
    const lugar = await Lugar.findByPk(id, { include: { all: true } });
    return lugar;
  } catch (error) {
    throw new Error('Error fetching place: ' + error.message);
  }
}

async function updateLugar(id, updatedData) {
  try {
    const lugar = await Lugar.findByPk(id);
    if (!lugar) {
      throw new Error('place not found');
    }
    await lugar.update(updatedData);
    return lugar;
  } catch (error) {
    throw new Error('Error updating place: ' + error.message);
  }
}

async function deleteLugar(id) {
  try {
    const lugar = await Lugar.findByPk(id);
    if (!lugar) {
      throw new Error('place not found');
    }
    await lugar.destroy();
    return true;
  } catch (error) {
    throw new Error('Error deleting place: ' + error.message);
  }
}

export { createLugar, getLugarById, updateLugar, deleteLugar, getAllLugares };

import { EquipoInformatico } from "../models/EquipoInformatico.model.js"
import { sequelize } from "../../../connection.js";

async function createEquipoInformatico(marca, numeroDeSerie, modelo, numeroDePatrimonio, estado, observacion, especificacionesTecnicas, precio) {
  const t = await sequelize.transaction();
  try {
    // Inicia una transacción
    const equipoInformatico = await EquipoInformatico.create({ marca, numeroDeSerie, modelo, numeroDePatrimonio, estado, observacion, especificacionesTecnicas, precio }, { transaction: t });
    // Confirma la transacción si todo fue exitoso
    await t.commit();
    return equipoInformatico;
  } catch (error) {
    // Revierte la transacción en caso de error
    await t.rollback();
    throw new Error('Error creating hardware: ' + error.message);
  }
}

async function getAllEquipoInformaticos() {
  try {
    // const equipoInformaticos = await EquipoInformatico.findAll({ include: { all: true,  include: { all: true } } });
    const equipoInformaticos = await EquipoInformatico.findAll({ include: { all: true, nested: true } });
    return equipoInformaticos;
  } catch (error) {
    throw new Error('Error fetching hardware: ' + error.message);
  }
}

async function getEquipoInformaticoById(id) {
  try {
    const equipoInformatico = await EquipoInformatico.findByPk(id, { include: { all: true } });
    return equipoInformatico;
  } catch (error) {
    throw new Error('Error fetching hardware: ' + error.message);
  }
}

async function updateEquipoInformatico(id, updatedData) {
  try {
    const equipoInformatico = await EquipoInformatico.findByPk(id);
    if (!equipoInformatico) {
      throw new Error('hardware not found');
    }
    await equipoInformatico.update(updatedData);
    return equipoInformatico;
  } catch (error) {
    throw new Error('Error updating hardware: ' + error.message);
  }
}

async function deleteEquipoInformatico(id) {
  try {
    const equipoInformatico = await EquipoInformatico.findByPk(id);
    if (!equipoInformatico) {
      throw new Error('hardware not found');
    }
    await equipoInformatico.destroy();
    return true;
  } catch (error) {
    throw new Error('Error deleting hardware: ' + error.message);
  }
}

export { createEquipoInformatico, getAllEquipoInformaticos, getEquipoInformaticoById, updateEquipoInformatico, deleteEquipoInformatico };

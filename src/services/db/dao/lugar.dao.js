import { Lugar } from "../models/Lugar.model.js"
import DaoService from "./helper/DAO.service.js";

const daoService = new DaoService(Lugar);
export default class LugarDao {

  async createLuga(obj) {
    return await daoService.create(obj);
  }
  async getAllLugares() {
    return await daoService.getAll();
  }
  async getLugarById(id) {
    return await daoService.getById(id);
  }
  async updateLugar(id, updatedData) {
    return await daoService.updateById(id, updatedData);
  }
  async deleteLugar(id) {
    return await daoService.deleteById(id);
  }
  async findDeletedLugarByID(id) {
    return await daoService.findDeletedBy("id", id);
  }
  async getAllDeletedLugares() {
    return await daoService.getAllDeleted();
  }
  async restoreLugarById(id) {
    return await daoService.restoreById(id);
  }
}


// async function createLuga(obj){
//   try {
//     const lugar = await Lugar.create( obj );
//     return lugar;
//   } catch (error) {
//     throw new Error('Error creating place: ' + error.message);
//   }
// }
// async function getAllLugares() {
//   try {
//     const lugares = await Lugar.findAll({ include: { all: true } });
//     return lugares;
//   } catch (error) {
//     throw new Error('Error fetching places: ' + error.message);
//   }
// }

// async function getLugarById(id) {
//   try {
//     const lugar = await Lugar.findByPk(id, { include: { all: true } });
//     return lugar;
//   } catch (error) {
//     throw new Error('Error fetching place: ' + error.message);
//   }
// }

// async function updateLugar(id, updatedData) {
//   try {
//     const lugar = await Lugar.findByPk(id);
//     if (!lugar) {
//       throw new Error('place not found');
//     }
//     await lugar.update(updatedData);
//     return lugar;
//   } catch (error) {
//     throw new Error('Error updating place: ' + error.message);
//   }
// }

// async function deleteLugar(id) {
//   try {
//     const lugar = await Lugar.findByPk(id);
//     if (!lugar) {
//       throw new Error('place not found');
//     }
//     await lugar.destroy();
//     return true;
//   } catch (error) {
//     throw new Error('Error deleting place: ' + error.message);
//   }
// }


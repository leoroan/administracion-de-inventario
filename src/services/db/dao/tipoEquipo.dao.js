import { TipoEquipo } from "../models/TipoEquipo.model.js"
import DaoService from './helper/DAO.service.js';

const daoService = new DaoService(TipoEquipo);
export default class TipoEquipoDao {
  async createTipoEquipo(obj) {
    return await daoService.create(obj);
  }
  async getTipoEquipoById(id) {
    return await daoService.getById(id);
  }
  async getAllTipoEquipos() {
    return await daoService.getAll();
  }
  async updateTipoEquipo(id, updatedData) {
    return await daoService.update(id, updatedData);
  }
  async deleteTipoEquipo(id) {
    return await daoService.delete(id);
  }
  async findDeletedTipoEquipoByID(id) {
    return await daoService.findDeletedBy("id", id);
  }
  async getAllDeletedTipoEquipos() {
    return await daoService.getAllDeleted();
  }
  async restoreTipoEquipoById(id) {
    return await daoService.restoreById(id);
  }
}



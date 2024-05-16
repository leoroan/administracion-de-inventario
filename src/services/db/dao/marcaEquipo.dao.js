import { MarcaEquipo } from '../models/MarcaEquipo.model.js';
import DaoService from './helper/DAO.service.js';

const daoService = new DaoService(MarcaEquipo);
export default class MarcaEquipoDao {
  async createMarcaEquipo(obj) {
    return await daoService.create(obj);
  }
  async getMarcaEquipoById(id) {
    return await daoService.getById(id);
  }
  async getAllMarcaEquipos() {
    return await daoService.getAll();
  }
  async updateMarcaEquipo(id, updatedData) {
    return await daoService.update(id, updatedData);
  }
  async deleteMarcaEquipo(id) {
    return await daoService.delete(id);
  }
  async findDeletedMarcaEquipoByID(id) {
    return await daoService.findDeletedBy("id", id);
  }
  async getAllDeletedMarcaEquipos() {
    return await daoService.getAllDeleted();
  }
  async restoreMarcaEquipoById(id) {
    return await daoService.restoreById(id);
  }
}
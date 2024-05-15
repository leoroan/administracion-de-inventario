import { Oficina } from "../models/Oficina.model.js"
import DaoService from './helper/DAO.service.js';

const daoService = new DaoService(Oficina);
export default class OficinaDao {
  async createOficina(nombre, descripcion, telefono, email) {
    return await daoService.create({ nombre, descripcion, telefono, email });
  }
  async getOficinaById(id) {
    return await daoService.getById(id);
  }
  async getAllOficinas() {
    return await daoService.getAll();
  }
  async updateOficina(id, updatedData) {
    return await daoService.update(id, updatedData);
  }
  async deleteOficina(id) {
    return await daoService.delete(id);
  }
  async findDeletedOficinaByID(id) {
    return await daoService.findDeletedBy("id", id);
  }
  async getAllDeletedOficinas() {
    return await daoService.getAllDeleted();
  }
  async restoreOficinaById(id) {
    return await daoService.restoreById(id);
  }
}




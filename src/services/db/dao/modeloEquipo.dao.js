import { ModeloEquipo } from '../models/ModeloEquipo.model.js';
import DaoService from './helper/DAO.service.js';

const daoService = new DaoService(ModeloEquipo);
export default class ModeloEquipoDao {
  async createModeloEquipo(obj) {
    return await daoService.create(obj);
  }
  async getModeloEquipoById(id) {
    return await daoService.getById(id);
  }
  async getAllModeloEquipos() {
    return await daoService.getAll();
  }
  async updateModeloEquipo(id, updatedData) {
    return await daoService.update(id, updatedData);
  }
  async deleteModeloEquipo(id) {
    return await daoService.delete(id);
  }
  async findDeletedModeloEquipoByID(id) {
    return await daoService.findDeletedBy("id", id);
  }
  async getAllDeletedModeloEquipos() {
    return await daoService.getAllDeleted();
  }
  async restoreModeloEquipoById(id) {
    return await daoService.restoreById(id);
  }
}
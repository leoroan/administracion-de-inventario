import { MantenimientoDeEquipo } from '../models/MantenimientoDeEquipo.model.js';
import DaoService from './helper/DAO.service.js';

const daoService = new DaoService(MantenimientoDeEquipo);
export default class MantenimientoDeEquipoDao {
  async createMantenimientoDeEquipo(obj) {
    return await daoService.create(obj);
  }
  async getMantenimientoDeEquipoById(id) {
    return await daoService.getById(id);
  }
  async getAllMantenimientoDeEquipos() {
    return await daoService.getAll();
  }
  async updateMantenimientoDeEquipo(id, updatedData) {
    return await daoService.update(id, updatedData);
  }
  async deleteMantenimientoDeEquipo(id) {
    return await daoService.delete(id);
  }
  async findDeletedMantenimientoDeEquipoByID(id) {
    return await daoService.findDeletedBy("id", id);
  }
  async getAllDeletedMantenimientoDeEquipos() {
    return await daoService.getAllDeleted();
  }
  async restoreMantenimientoDeEquipoById(id) {
    return await daoService.restoreById(id);
  }
}
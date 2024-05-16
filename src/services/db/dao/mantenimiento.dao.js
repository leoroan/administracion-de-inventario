import { MantenimientoDeEquipo } from '../models/MantenimientoDeEquipo.model.js';
import DaoService from './helper/DAO.service.js';

const daoService = new DaoService(MantenimientoDeEquipo);
export default class MantenimientoEquipoDao {
  async createMantenimientoEquipo(obj) {
    return await daoService.create(obj);
  }
  async getMantenimientoEquipoById(id) {
    return await daoService.getById(id);
  }
  async getAllMantenimientoEquipos() {
    return await daoService.getAll();
  }
  async updateMantenimientoEquipo(id, updatedData) {
    return await daoService.update(id, updatedData);
  }
  async deleteMantenimientoEquipo(id) {
    return await daoService.delete(id);
  }
  async findDeletedMantenimientoEquipoByID(id) {
    return await daoService.findDeletedBy("id", id);
  }
  async getAllDeletedMantenimientoEquipos() {
    return await daoService.getAllDeleted();
  }
  async restoreMantenimientoEquipoById(id) {
    return await daoService.restoreById(id);
  }
}
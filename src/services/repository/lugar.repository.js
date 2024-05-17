export default class LugarRepository {
  constructor(dao) {
    this.dao = dao
  }
  createLugar = async (obj) => {
    return await this.dao.createLugar(obj);
  }
  getAllLugares = async () => {
    return await this.dao.getAllLugares();
  }
  getLugarById = async (id) => {
    return await this.dao.getLugarById(id);
  }
  updateLugar = async (id, updatedData) => {
    return await this.dao.updateLugar(id, updatedData);
  }
  deleteLugar = async (id) => {
    return await this.dao.deleteLugar(id);
  }
  findDeletedLugarByID = async (id) => {
    return await this.dao.findDeletedLugarByID("id", id);
  }
  getAllDeletedLugares = async () => {
    return await this.dao.getAllDeletedLugares();
  }
  restoreLugarById = async (id) => {
    return await this.dao.restoreLugarById(id);
  }
}
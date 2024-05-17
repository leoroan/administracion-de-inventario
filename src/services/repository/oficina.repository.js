export default class OficinaRepository {
  constructor(dao) {
    this.dao = dao
  }
  createOficina = async (obj) => {
    return await this.dao.createOficina(obj);
  }
  getOficinaById = async (id) => {
    return await this.dao.getOficinaById(id);
  }
  getAllOficinas = async () => {
    return await this.dao.getAllOficinas();
  }
  updateOficina = async (id, updatedData) => {
    return await this.dao.updateOficina(id, updatedData);
  }
  deleteOficina = async (id) => {
    return await this.dao.deleteOficina(id);
  }
  findDeletedOficinaByID = async (id) => {
    return await this.dao.findDeletedOficinaByID("id", id);
  }
  getAllDeletedOficinas = async () => {
    return await this.dao.getAllDeletedOficinas();
  }
  restoreOficinaById = async (id) => {
    return await this.dao.restoreOficinaById(id);
  }




}
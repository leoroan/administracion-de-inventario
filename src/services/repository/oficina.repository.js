export default class OficinaRepository {
  constructor(dao) {
    this.dao = dao
  }
  createOficina = async (obj) => {
    return await daoService.create(obj);
  }
  getOficinaById = async (id) => {
    return await daoService.getById(id);
  }
  getAllOficinas = async () => {
    return await daoService.getAll();
  }
  updateOficina = async (id, updatedData) => {
    return await daoService.updateById(id, updatedData);
  }
  deleteOficina = async (id) => {
    return await daoService.deleteById(id);
  }
  findDeletedOficinaByID = async (id) => {
    return await daoService.findDeletedBy("id", id);
  }
  getAllDeletedOficinas = async () => {
    return await daoService.getAllDeleted();
  }
  restoreOficinaById = async (id) => {
    return await daoService.restoreById(id);
  }




}
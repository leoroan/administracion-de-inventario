export default class LugarRepository {
  constructor(dao) {
    this.dao = dao
  }

  createLugar = async (obj) => {
    return await daoService.create(obj);
  }

  getAllLugares = async () => {
    return await daoService.getAll();
  }

  getLugarById = async (id) => {
    return await daoService.getById(id);
  }
  updateLugar = async (id, updatedData) => {
    return await daoService.updateById(id, updatedData);
  }
  deleteLugar = async (id) => {
    return await daoService.deleteById(id);
  }

  findDeletedLugarByID = async (id) => {
    return await daoService.findDeletedBy("id", id);
  }

  getAllDeletedLugares = async () => {
    return await daoService.getAllDeleted();
  }

  restoreLugarById = async (id) => {
    return await daoService.restoreById(id);
  }




}
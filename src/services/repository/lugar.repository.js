export default class LugarRepository {
  constructor(dao) {
    this.dao = dao
  }

  createLugar = async (nombre, calle, altura, comentario) => {
    return await daoService.create({ nombre, calle, altura, comentario });
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
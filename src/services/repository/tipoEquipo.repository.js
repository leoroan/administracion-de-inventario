export default class TipoEquipoRepository {
  constructor(dao) {
    this.dao = dao
  }
  createTipoEquipo = async (obj) => {
    return await daoService.create(obj);
  }
  getAllTipoEquipos = async () => {
    return await daoService.getAll();
  }
  getTipoEquipoById = async (id) => {
    return await daoService.getById(id);
  }
  updateTipoEquipo = async (id, updatedData) => {
    return await daoService.updateById(id, updatedData);
  }
  deleteTipoEquipo = async (id) => {
    return await daoService.deleteById(id);
  }
  findDeletedTipoEquipoByID = async (id) => {
    return await daoService.findDeletedBy("id", id);
  }
  getAllDeletedTipoEquipos = async () => {
    return await daoService.getAllDeleted();
  }
  restoreTipoEquipoById = async (id) => {
    return await daoService.restoreById(id);
  }
}
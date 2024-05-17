export default class TipoEquipoRepository {
  constructor(dao) {
    this.dao = dao
  }
  createTipoEquipo = async (obj) => {
    return await this.dao.createTipoEquipo(obj);
  }
  getAllTipoEquipos = async () => {
    return await this.dao.getAllTipoEquipos();
  }
  getTipoEquipoById = async (id) => {
    return await this.dao.getTipoEquipoById(id);
  }
  updateTipoEquipo = async (id, updatedData) => {
    return await this.dao.updateTipoEquipo(id, updatedData);
  }
  deleteTipoEquipo = async (id) => {
    return await this.dao.deleteTipoEquipo(id);
  }
  findDeletedTipoEquipoByID = async (id) => {
    return await this.dao.findDeletedTipoEquipoByID("id", id);
  }
  getAllDeletedTipoEquipos = async () => {
    return await this.dao.getAllDeletedTipoEquipos();
  }
  restoreTipoEquipoById = async (id) => {
    return await this.dao.restoreTipoEquipoById(id);
  }
}
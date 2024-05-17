export default class MantenimientoDeEquipoRepository {
  constructor(dao) {
    this.dao = dao
  }
  createMantenimientoDeEquipo = async (obj) => {
    return await this.dao.createMantenimientoDeEquipo(obj);
  }
  getAllMantenimientoDeEquipos = async () => {
    return await this.dao.getAllMantenimientoDeEquipos();
  }
  getMantenimientoDeEquipoById = async (id) => {
    return await this.dao.getMantenimientoDeEquipoById(id);
  }
  updateMantenimientoDeEquipo = async (id, updatedData) => {
    return await this.dao.updateMantenimientoDeEquipo(id, updatedData);
  }
  deleteMantenimientoDeEquipo = async (id) => {
    return await this.dao.deleteMantenimientoDeEquipo(id);
  }
  findDeletedMantenimientoDeEquipoByID = async (id) => {
    return await this.dao.findDeletedMantenimientoDeEquipoByID("id", id);
  }
  getAllDeletedMantenimientoDeEquipos = async () => {
    return await this.dao.getAllDeletedMantenimientoDeEquipos();
  }
  restoreMantenimientoDeEquipoById = async (id) => {
    return await this.dao.restoreMantenimientoDeEquipoById(id);
  }
}
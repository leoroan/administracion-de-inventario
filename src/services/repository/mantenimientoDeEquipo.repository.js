export default class MantenimientoDeEquipoRepository {
  constructor(dao) {
    this.dao = dao
  }
  createMantenimientoDeEquipo = async (obj) => {
    return await daoService.create(obj);
  }
  getAllMantenimientoDeEquipos = async () => {
    return await daoService.getAll();
  }
  getMantenimientoDeEquipoById = async (id) => {
    return await daoService.getById(id);
  }
  updateMantenimientoDeEquipo = async (id, updatedData) => {
    return await daoService.updateById(id, updatedData);
  }
  deleteMantenimientoDeEquipo = async (id) => {
    return await daoService.deleteById(id);
  }
  findDeletedMantenimientoDeEquipoByID = async (id) => {
    return await daoService.findDeletedBy("id", id);
  }
  getAllDeletedMantenimientoDeEquipos = async () => {
    return await daoService.getAllDeleted();
  }
  restoreMantenimientoDeEquipoById = async (id) => {
    return await daoService.restoreById(id);
  }
}
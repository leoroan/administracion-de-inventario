export default class MantenimientoEquipoRepository {
  constructor(dao) {
    this.dao = dao
  }
  createMantenimientoEquipo = async (obj) => {
    return await daoService.create(obj);
  }
  getAllMantenimientoEquipoes = async () => {
    return await daoService.getAll();
  }
  getMantenimientoEquipoById = async (id) => {
    return await daoService.getById(id);
  }
  updateMantenimientoEquipo = async (id, updatedData) => {
    return await daoService.updateById(id, updatedData);
  }
  deleteMantenimientoEquipo = async (id) => {
    return await daoService.deleteById(id);
  }
  findDeletedMantenimientoEquipoByID = async (id) => {
    return await daoService.findDeletedBy("id", id);
  }
  getAllDeletedMantenimientoEquipoes = async () => {
    return await daoService.getAllDeleted();
  }
  restoreMantenimientoEquipoById = async (id) => {
    return await daoService.restoreById(id);
  }
}
export default class EquipoInformaticoRepository {
  constructor(dao) {
    this.dao = dao
  }

  createEquipoInformatico = async (mt, marca, numeroDeSerie, modelo, numeroDePatrimonio, estado, observacion, especificacionesTecnicas, precio, remitoNumero) => {
    return await this.dao.createEquipoInformatico(mt, marca, numeroDeSerie, modelo, numeroDePatrimonio, estado, observacion, especificacionesTecnicas, precio, remitoNumero);
  }

  getAllEquipoInformaticos = async () => {
    return await this.dao.getAllEquipoInformaticos();
  }

  getEquipoInformaticoById = async (id) => {
    return await this.dao.getEquipoInformaticoById(id);
  }

  updateEquipoInformatico = async (id, updateData) => {
    return await this.dao.updateEquipoInformatico(id, updateData);
  }

  deleteEquipoInformatico = async (id) => {
    return await this.dao.deleteEquipoInformatico(id);
  }
  findDeletedEquipoInformaticoByID = async (id) => {
    return await this.dao.findDeletedEquipoInformaticoByID(id);
  }
  getAllDeletedEquipoInformaticos = async () => {
    return await this.dao.getAllDeletedEquipoInformaticos();
  }
  restoreEquipoInformaticoById = async (id) => {
    return await this.dao.restoreEquipoInformaticoById(id);
  }
}
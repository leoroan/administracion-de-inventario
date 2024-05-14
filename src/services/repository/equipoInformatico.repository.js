export default class EquipoInformaticoRepository {
  constructor(dao) {
    this.dao = dao
  }

  createEquipoInformatico = async (marca, numeroDeSerie, modelo, numeroDePatrimonio, estado, observacion, especificacionesTecnicas, precio) => {
    return await this.dao.createEquipoInformatico(marca, numeroDeSerie, modelo, numeroDePatrimonio, estado, observacion, especificacionesTecnicas, precio);
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
  findDeletedEquipoInformaticoByNumeroDeSerie = async (numeroDeSerie) => {
    return await this.dao.findDeletedEquipoInformaticoByNumeroDeSerie(numeroDeSerie);
  }
  getAllDeletedEquipoInformaticos = async () => {
    return await this.dao.getAllDeletedEquipoInformaticos();
  }
  restoreEquipoInformaticoById = async (id) => {
    return await this.dao.restoreEquipoInformaticoById(id);
  }
}
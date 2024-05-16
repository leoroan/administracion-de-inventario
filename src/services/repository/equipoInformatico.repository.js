export default class EquipoInformaticoRepository {
  constructor(dao) {
    this.dao = dao
  }

  createEquipoInformatico = async (obj) => {
    return await this.dao.createEquipoInformatico(obj);
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
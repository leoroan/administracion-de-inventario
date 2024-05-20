export default class ModeloEquipoRepository {
  constructor(dao) {
    this.dao = dao
  }
  createModeloEquipo = async (obj) => {
    return await this.dao.createModeloEquipo(obj);
  }
  getModeloEquipoById = async (id) => {
    return await this.dao.getModeloEquipoById(id);
  }
  getAllModeloEquipos = async () => {
    return await this.dao.getAllModeloEquipos();
  }
  updateModeloEquipo = async (id, updatedData) => {
    return await this.dao.updateModeloEquipo(id, updatedData);
  }
  deleteModeloEquipo = async (id) => {
    return await this.dao.deleteModeloEquipo(id);
  }
  findDeletedModeloEquipoByID = async (dni) => {
    return await this.dao.findDeletedModeloEquipoByID(dni);
  }
  getAllDeletedModeloEquipos = async () => {
    return await this.dao.getAllDeletedModeloEquipos();
  }
  restoreModeloEquipoById = async (id) => {
    return await this.dao.restoreModeloEquipoById(id);
  }
  getModelosByBrand = async (brandName) => {
    return await this.dao.getModelosByBrand(brandName);
  }
}
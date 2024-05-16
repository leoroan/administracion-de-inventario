export default class MarcaEquipoRepository {
  constructor(dao) {
    this.dao = dao
  }
  createMarcaEquipo = async (obj) => {
    return await this.dao.createMarcaEquipo(obj);
  }
  getMarcaEquipoById = async (id) => {
    return await this.dao.getMarcaEquipoById(id);
  }
  getAllMarcaEquipos = async () => {
    return await this.dao.getAllMarcaEquipos();
  }  
  updateMarcaEquipo = async (id, updatedData) => {
    return await this.dao.updateMarcaEquipo(id, updatedData);
  }  
  deleteMarcaEquipo = async (id) => {
    return await this.dao.deleteMarcaEquipo(id);
  }
  findDeletedMarcaEquipoByDni = async (dni) => {
    return await this.dao.findDeletedMarcaEquipoByDni(dni);
  }
  getAllDeletedMarcaEquipos = async () => {
    return await this.dao.getAllDeletedMarcaEquipos();
  }
  restoreMarcaEquipoById = async (id) => {
    return await this.dao.restoreMarcaEquipoById(id);
  }
}
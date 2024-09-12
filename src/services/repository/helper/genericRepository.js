export default class genericRepository {
  constructor(dao) {
    this.dao = dao
  }
  creategeneric = async (obj) => {
    return await this.dao.create(obj);
  }
  getgenericById = async (id) => {
    return await this.dao.getById(id);
  }
  getAllgenerics = async () => {
    return await this.dao.getAll();
  }
  updategeneric = async (id, updatedData) => {
    return await this.dao.update(id, updatedData);
  }
  deletegeneric = async (id) => {
    return await this.dao.delete(id);
  }
  findDeletedgenericById = async (id) => {
    return await this.dao.findDeletedBy(id);
  }
  getAllDeletedgenerics = async () => {
    return await this.dao.getAllDeleted();
  }
  getAllImagenesActas = async () => {
    return await this.dao.getAllImagesActas();
  }
  restoregenericById = async (id) => {
    return await this.dao.restoreById(id);
  }
  insertInBulkgeneric = async (obj) => {
    return await this.dao.insertInBulk(obj);
  }
  getgenericByUserId = async (id) => {
    return await this.dao.getByUserId(id);
  }
  obtenergenericById = async (id) => {
    return await this.dao.obtenerById(id);
  }
  findImgByActaIdGeneric = async (id) => {
    return await this.dao.findImgByActaId(id);
  }
}
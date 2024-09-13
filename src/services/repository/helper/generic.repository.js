export default class GenericRepository {
  constructor(dao) {
    this.dao = dao
  }
  createGeneric = async (data) => {
    return await this.dao.create(data);
  }
  findByIdGeneric = async (id) => {
    return await this.dao.findById(id);
  }
  findAllGeneric = async () => {
    return await this.dao.findAll();
  }
  updateGeneric = async (id, updatedData) => {
    return await this.dao.update(id, updatedData);
  }
  deleteGeneric = async (id) => {
    return await this.dao.delete(id);
  }
  // findDeletedByIdGeneric = async (id) => {
  //   return await this.dao.findDeletedBy(id);
  // }
  // getAllDeletedGeneric = async () => {
  //   return await this.dao.getAllDeleted();
  // }
  // restoreByIdGeneric = async (id) => {
  //   return await this.dao.restoreById(id);
  // }
  // insertInBulkGeneric = async (obj) => {
  //   return await this.dao.insertInBulk(obj);
  // }
}
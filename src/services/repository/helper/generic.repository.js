export default class GenericRepository {
  constructor(dao) {
    this.dao = dao
  }
  create = async (data) => {
    return await this.dao.create(data);
  }
  findById = async (id, opt) => {
    return await this.dao.findById(id, opt);
  }
  findAll = async (opt) => {
    return await this.dao.findAll(opt);
  }
  update = async (id, updatedData) => {
    return await this.dao.update(id, updatedData);
  }
  delete = async (id) => {
    return await this.dao.delete(id);
  }
}
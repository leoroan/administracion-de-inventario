import DaoService from './helper.dao.js';
import { User } from '../../models/user.model.js';
export default class GenericDao {

  constructor(model) {
    this.daoService = new DaoService(model);
  }
  async create(obj) {
    return await this.daoService.create(obj);
  }
  async getById(id) {
    return await this.daoService.getById(id);
  }
  async getAll() {
    return await this.daoService.getAll();
  }
  async update(id, updatedData) {
    return await this.daoService.update(id, updatedData);
  }
  async delete(id) {
    return await this.daoService.delete(id);
  }
  async findDeletedById(id) {
    return await this.daoService.findDeletedBy("id", id);
  }
  async getAllDeleted() {
    return await this.daoService.getAllDeleted();
  }
  async restoreById(id) {
    return await this.daoService.restoreById(id);
  }
  async insertInBulk(obj) {
    return await this.daoService.insertInBulk(obj);
  }
  async getByUserId(userId) {
    try {
      const user = await User.findByPk(userId, { include: { model: model } });
      if (user) {
        return user[`${model}s`];
      } else {
        throw new Error('Error fetching user');
      }
    } catch (error) {
      throw new Error(`Error fetching user and their records: ${error.message}`);
    }
  }
  async findImgByActaId(actaId) {
    return await this.daoService.findImgByActaId(actaId);
  }
}

import { SequelizeError } from '../../../../utils/errors.js';
export default class GenericDAO {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    let transaction;
    try {
      transaction = await this.model.sequelize.transaction();
      const newRecord = await this.model.create(data, { transaction });
      await transaction.commit();
      return newRecord;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw SequelizeError.handleSequelizeError(error, `Error creating ${this.model.name}`);
    }
  }

  async findById(id) {
    try {
      const record = await this.model.findByPk(id);
      if (!record) throw new Error(`${this.model.name} not found`);
      return record;
    } catch (error) {
      throw SequelizeError.handleSequelizeError(error, `Error fetching ${this.model.name}`);
    }
  }

  async findAll(query = {}) {
    try {
      const records = await this.model.findAll({ where: query });
      if (!records) throw new Error(`${this.model.name}s not found`);
      return records;
    } catch (error) {
      throw SequelizeError.handleSequelizeError(error, `Error fetching ${this.model.name}`);
    }
  }

  async update(id, data) {
    let transaction;
    try {
      transaction = await this.model.sequelize.transaction();
      const record = await this.model.findByPk(id);
      if (!record) throw new Error(`${this.model.name} not found`)
      const updatedRecord = await record.update(data, { transaction });
      await transaction.commit();
      return updatedRecord.get({ plain: true });
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw SequelizeError.handleSequelizeError(error, `Error updating ${this.model.name}`);
    }
  }

  async delete(id) {
    let transaction;
    try {
      transaction = await this.model.sequelize.transaction();
      const record = await this.model.findByPk(id);
      if (!record) throw new Error(`${this.model.name} not found`);
      await record.destroy({ transaction });
      await transaction.commit();
      return (`${this.model.name} deleted`);
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw SequelizeError.handleSequelizeError(error, `Error deleting ${this.model.name}`);
    }
  }
}


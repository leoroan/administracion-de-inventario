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
      throw SequelizeError.handleSequelizeError(error, `Error creando ${this.model.name}`);
    }
  }

  async findById(id, options = {}) {
    try {
      const record = await this.model.findByPk(id, options);
      if (!record) throw new Error(`${this.model.name} no encontrado`);
      return record;
    } catch (error) {
      throw SequelizeError.handleSequelizeError(error, `buscando ${this.model.name}`);
    }
  }

  async findAll(options = {}) {
    try {
      const records = await this.model.findAll(options);
      if (!records) throw new Error(`${this.model.name}s no encontrado`);
      return records;
    } catch (error) {
      throw SequelizeError.handleSequelizeError(error, `buscando ${this.model.name}`);
    }
  }

  async update(id, data) {
    let transaction;
    try {
      transaction = await this.model.sequelize.transaction();
      const record = await this.model.findByPk(id);
      if (!record) throw new Error(`${this.model.name} no encontrado`)
      const updatedRecord = await record.update(data, { transaction });
      await transaction.commit();
      return updatedRecord.get({ plain: true });
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw SequelizeError.handleSequelizeError(error, `actualizando ${this.model.name}`);
    }
  }

  async delete(id) {
    let transaction;
    try {
      transaction = await this.model.sequelize.transaction();
      const record = await this.model.findByPk(id);
      if (!record) throw new Error(`${this.model.name} no encontrado`);
      await record.destroy({ transaction });
      await transaction.commit();
      return (`${this.model.name} deleted`);
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw SequelizeError.handleSequelizeError(error, `borrando ${this.model.name}`);
    }
  }
}


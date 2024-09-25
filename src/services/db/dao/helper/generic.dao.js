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

  async findById(id, scope = 'defaultScope') {
    scope = Array.isArray(scope) ? scope : scope.split(',');
    try {
      const record = scope ? await this.model.scope(scope).findByPk(id) : await this.model.findByPk(id);
      if (!record) throw new Error(`${this.model.name} no encontrado`);
      return record;
    } catch (error) {
      throw SequelizeError.handleSequelizeError(error, `buscando ${this.model.name}`);
    }
  }

  async findAll(scope = 'defaultScope') {
    scope = Array.isArray(scope) ? scope : scope.split(',');
    try {
      const records = scope ? await this.model.scope(scope).findAll() : await this.model.findAll();
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


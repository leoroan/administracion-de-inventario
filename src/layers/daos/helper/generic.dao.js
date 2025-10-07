import { NotFound, SequelizeError } from "../../../config/error/errors.js";

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

  async findOne(data, scope) {
    return await this.model.scope(scope).findOne(data);
  }

  async findById( id, scope = 'defaultScope') {
    scope = Array.isArray(scope) ? scope : scope.split(',');
    return await this.model.scope(scope).findByPk(id)
  }

  async findOrCreate(options = {}) {
    let transaction;
    try {
      transaction = await this.model.sequelize.transaction();
      const [instance, created] = await this.model.findOrCreate({
        ...options,
        transaction,
      });
      await transaction.commit();
      return [instance, created];
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw new Error(`Error en findOrCreate: ${error.message}`);
    }
  }


  async findAndCountAll(data, scope) {
    return await this.model.scope(scope).findAndCountAll(data);
  }

  async findAllPlain(data, scope) {
    return await this.model.scope(scope).findAll(data);
  }

  async update(oldRecord, data) {
    let transaction;
    try {
      transaction = await this.model.sequelize.transaction();
      const updatedRecord = await oldRecord.update(data, { transaction });
      await transaction.commit();
      return updatedRecord;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw SequelizeError.handleSequelizeError(error, `Error actualizando ${this.model.name}`);
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
    }
  }

  async countRegisters() {
    return await this.model.count();
  }

  async restore(id) {
    let transaction;
    try {
      transaction = await this.model.sequelize.transaction();
      const record = await this.model.findByPk(id, { paranoid: false });
      if (!record) throw new NotFound(`${this.model.name} no encontrado`);
      await record.restore({ transaction });
      await transaction.commit();
      return record;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw SequelizeError.handleSequelizeError(error, `Error restaurando ${this.model.name}`);
    }
  }
}
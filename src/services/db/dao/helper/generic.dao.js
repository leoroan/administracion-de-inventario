import { SequelizeError } from '../../../../utils/errors.js';
import { parseQuery } from './parseQuerys.js';
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
      // const record = scope ? await this.model.scope(scope).findByPk(id) : await this.model.findByPk(id);
      const record = await this.model.scope(scope).findByPk(id)
      if (!record) throw new Error(`${this.model.name} no encontrado`);
      return record;
    } catch (error) {
      throw SequelizeError.handleSequelizeError(error, `buscando ${this.model.name}`);
    }
  }

  async findAll({ scope = 'defaultScope', page, pageSize, query = "" }) {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    scope = Array.isArray(scope) ? scope : scope.split(',');
    const querys = parseQuery(query);

    try {
      if (page && pageSize) {
        const { rows: resultados, count: totalElementos } = await this.model.scope(scope).findAndCountAll({
          offset: (page - 1) * pageSize,
          limit: pageSize,
          where: querys,
          order: [ //por defecto orden de creado primero toBe developed
            ['createdAt', 'DESC'],
          ]  
        });
        return { rows: resultados, count: totalElementos };
      }
      const records = scope ? await this.model.scope(scope).findAll({ where: querys }) : await this.model.findAll({ where: querys });
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


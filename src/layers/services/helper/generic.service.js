import { Op } from 'sequelize';
import { BadRequest, NotFound } from '../../../config/error/errors.js';

export default class GenericService {
  constructor(dao) {
    this.dao = dao;
  }

  async create(data) {
    return await this.dao.create(data);
  }

  async findOne(options, scope = 'defaultScope') {
    return await this.dao.findOne(options, scope);
  }

  async findById(id, scope = 'defaultScope') {
    if (!id) {
      throw new BadRequest('El ID es obligatorio');
    }
    const record = await this.dao.findById(id, scope);
    if (!record) {
      throw new NotFound(`${this.dao.model.name} con ID ${id} no encontrado`);
    }
    return record;
  }

  async findByField(data, scope = 'defaultScope') {
    if (!data) {
      throw new BadRequest('Un campo es obligatorios');
    }
    const record = await this.dao.findOne({ where: data }, scope);
    if (!record) {
      throw new NotFound(`${this.dao.model.name} con ${JSON.stringify(data)} no encontrado`);
    }
    return record;
  }

  async findAllPlain(queryParams = {}) {
    const {
      scope = 'defaultScope',
      ...filters
    } = queryParams;

    const where = {};

    for (const key in filters) {
      const value = filters[key];
      if (value === undefined || value === '') continue;

      where[key] = value;
    }

    try {
      const results = await this.dao.findAllPlain({ where }, scope);
      return results;
    } catch (error) {
      throw new NotFound(`Error al buscar registros: ${error.message}`);
    }
  }

  async findAll(queryParams = {}) {
    const {
      page = 1,
      limit = 10,
      order = 'id',
      direction = 'ASC',
      scope = 'defaultScope',
      noPagination = false,
      ...filters
    } = queryParams;

    const offset = (parseInt(page) - 1) * limit;
    const where = {};

    const opMap = {
      gt: Op.gt,
      lt: Op.lt,
      gte: Op.gte,
      lte: Op.lte,
      like: Op.like,
      ilike: Op.like,
      ne: Op.ne,
      in: Op.in,
      notIn: Op.notIn,
      between: Op.between,
      notBetween: Op.notBetween,
      contains: Op.substring,
      startsWith: Op.startsWith,
      endsWith: Op.endsWith,
    };

    const orFilters = [];

    for (const key in filters) {
      const value = filters[key];
      if (value === undefined || value === '') continue;

      if (!key.includes('__')) {
        where[key] = value;
        continue;
      }

      const [field, operator] = key.split('__');
      const op = opMap[operator];
      if (!op) continue;

      const sameValueKeys = Object.entries(filters).filter(([k, v]) => v === value && k !== key);
      if (sameValueKeys.length > 0) {
        orFilters.push({ [field]: { [op]: value } });
      } else {
        if (!where[field]) where[field] = {};
        where[field][op] = value;
      }
    }

    if (orFilters.length > 0) {
      where[Op.or] = orFilters;
    }
    if (noPagination) {
      const options = {
        where,
        order: [[order, direction.toUpperCase()]],
        distinct: true,
      };

      try {
        const results = await this.dao.findAndCountAll(options, scope);
        return results;
      } catch (error) {
        throw new NotFound(`Error al buscar registros: ${error.message}`);
      }
    } else {
      const options = {
        where,
        limit: parseInt(limit),
        offset,
        order: [[order, direction.toUpperCase()]],
        distinct: true,
      };

      try {
        const results = await this.dao.findAndCountAll(options, scope);

        return {
          data: results.rows,
          pagination: {
            total: results.count,
            pages: Math.ceil(results.count / limit),
            current: parseInt(page),
            limit: parseInt(limit),
          },
        };
      } catch (error) {
        throw new NotFound(`Error al buscar registros: ${error.message}`);
      }
    }
  }

  async findOrCreate(options = {}) {
    if (!options.where) {
      throw new BadRequest("El where es obligatorio");
    }
    return this.dao.findOrCreate(options);
  }

  async update(id, data) {
    const oldRecord = await this.findById(id);
    const updated = await this.dao.update(oldRecord, data);
    if (!updated) {
      throw SequelizeError.handleSequelizeError(error, `Error actualizando ${this.model.name}`);
    }
    return updated;
  }

  async delete(id) {
    const deleted = await this.dao.delete(id);
    if (!deleted) {
      throw new NotFound(`${this.dao.model.name} con ID ${id} no encontrado para eliminar`);
    }
    return deleted;

  }

  async countRegisters() {
    return await this.dao.countRegisters();
  }

  async restore(id) {
    return await this.dao.restore({ where: { id } });
  }

}
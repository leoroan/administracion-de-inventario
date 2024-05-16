import CustomError from "../../../../utils/custom.error.js";

export default class DaoService {
  constructor(model) {
    this.model = model;
  }

  async create(obj) {
    try {
      const crudService = await this.model.create(obj);
      return crudService;
    } catch (error) {
      throw CustomError.handleSequelizeError(error, 'Error al crear');
    }
  }

  async getAll() {
    try {
      const crudServices = await this.model.findAll({ include: { all: true, nested: true } });
      return crudServices;
    } catch (error) {
      console.log(error);
      throw new CustomError(500, 'Error al obtener todos');
    }
  }

  async getById(id) {
    try {
      const crudService = await this.model.findByPk(id, { include: { all: true } });
      if (!crudService) {
        throw new CustomError(404, 'Elemento no encontrado');
      }
      return crudService;
    } catch (error) {
      throw CustomError.handleSequelizeError(error, `No se encontró nada con el ID ${id}`);
    }
  }

  async update(id, updatedData) {
    try {
      const crudService = await this.model.findByPk(id);
      if (!crudService) {
        throw new CustomError(404, 'Elemento no encontrado');
      }
      await crudService.update(updatedData);
      return crudService;
    } catch (error) {
      throw CustomError.handleSequelizeError(error, 'Error al querer actualizar');
    }
  }

  async delete(id) {
    try {
      const crudService = await this.model.findByPk(id);
      if (!crudService) {
        throw new CustomError(404, 'Elemento no encontrado');
      }
      await crudService.destroy();
      return true;
    } catch (error) {
      throw CustomError.handleSequelizeError(error, `No se encontró nada con el ID ${id}`);
    }
  }

  async findDeletedBy(caracteristica, value) {
    try {
      const crudService = await this.model.findOne({ where: { [caracteristica]: value }, include: { all: true }, paranoid: false });
      if (!crudService) {
        throw new CustomError(404, 'Elemento eliminado no encontrado con esa caracteristica');
      }
      if (!crudService.deletedAt) {
        throw new CustomError(401, 'El elemento no está eliminado');
      }
      return crudService;
    } catch (error) {
      throw CustomError.handleSequelizeError(error, `Error al buscar el elemento eliminado por ${caracteristica}: ${value}`);
    }
  }

  async getAllDeleted() {
    try {
      const crudService = await this.model.findAll({ paranoid: false });
      const crudServiceEliminados = crudService.filter(elem => elem.deletedAt !== null);
      if (crudServiceEliminados.length === 0) {
        throw new CustomError(404, 'No se encontraron eliminados');
      }
      return crudServiceEliminados;
    } catch (error) {
      throw CustomError.handleSequelizeError(error, 'Error al buscar eliminados');
    }
  }

  async restoreById(id) {
    try {
      const crudService = await this.model.findByPk(id, { paranoid: false });
      if (!crudService) {
        throw new CustomError(404, 'Elemento no encontrado');
      }
      if (!crudService.deletedAt) {
        throw new CustomError(405, 'El elemento no está eliminado');
      }
      await crudService.restore();
      return crudService;
    } catch (error) {
      throw CustomError.handleSequelizeError(error, `No se encontró nada borrado con el ID ${id}`);
    }
  }
}



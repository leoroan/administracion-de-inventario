import CustomError from "../../../../utils/custom.error.js";

export default class DaoService {
  constructor(model) {
    this.model = model;
  }

  async create(obj) {
    let transaction;
    try {
      // Iniciamos la transacción
      transaction = await this.model.sequelize.transaction();

      // Creamos el objeto dentro de la transacción
      const crudService = await this.model.create(obj, { transaction });

      // Confirmamos la transacción
      await transaction.commit();

      return crudService;
    } catch (error) {
      // Si hay algún error, revertimos la transacción
      if (transaction) await transaction.rollback();

      throw CustomError.handleSequelizeError(error, 'Error al crear');
    }
  }

  async getAll() {
    try {
      const crudServices = await this.model.findAll({ include: { all: true, nested: true } });
      return crudServices;
    } catch (error) {
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
    let transaction;
    try {
      // Iniciamos la transacción
      transaction = await this.model.sequelize.transaction();

      // Buscamos el registro a actualizar dentro de la transacción
      const crudService = await this.model.findByPk(id, { transaction });
      if (!crudService) {
        throw new CustomError(404, 'Elemento no encontrado');
      }

      // Actualizamos el registro dentro de la transacción
      await crudService.update(updatedData, { transaction });

      // Confirmamos la transacción
      await transaction.commit();

      return crudService;
    } catch (error) {
      // Si hay algún error, revertimos la transacción
      if (transaction) await transaction.rollback();

      throw CustomError.handleSequelizeError(error, 'Error al querer actualizar');
    }
  }

  async delete(id) {
    let transaction;
    try {
      // Iniciamos la transacción
      transaction = await this.model.sequelize.transaction();

      // Buscamos el registro a eliminar dentro de la transacción
      const crudService = await this.model.findByPk(id, { transaction });
      if (!crudService) {
        throw new CustomError(404, 'Elemento no encontrado');
      }

      // Eliminamos el registro dentro de la transacción
      await crudService.destroy({ transaction });

      // Confirmamos la transacción
      await transaction.commit();

      return true;
    } catch (error) {
      // Si hay algún error, revertimos la transacción
      if (transaction) await transaction.rollback();

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



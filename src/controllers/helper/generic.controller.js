import { devLogger } from '../../config/logger/logger.config.js';

export default class GenericController {
  constructor(service) {
    this.service = service;
  }

  async create(req, res) {
    try {
      const newRecord = await this.service.create(req.body);
      return res.sendSuccess(`Nuevo registro creado con el ID:${newRecord.id}`);
    } catch (error) {
      devLogger.debug(error)
      return res.sendError(error);
    }
  }

  async findById(req, res) {
    try {
      const { model = '', att = '', alias = '' } = req.query //alias lo usas x ej con oficina por "dependencias" o "oficinaPadre"...
      let options = {}; //
      if (model !== 'ALL') {
        options = {
          include: {
            association: model,
            as: alias,
            attributes: Array.isArray(att) ? att : [att],
          },
        };
      } else {
        options = { include: { all: true } }
      }
      const record = await this.service.findById(req.params.id, options);
      if (!record) return res.sendError(error);
      return res.sendSuccess(record);
    } catch (error) {
      devLogger.debug(error);
      return res.sendError(error);
    }
  }

  async findAll(req, res) {
    try {
      const { model = '', att = '', alias = '' } = req.query
      let options = {}; //
      if (model) {
        options = {
          include: {
            association: model,
            as: alias,
            attributes: Array.isArray(att) ? att : [att],
          },
        };
      }
      const records = await this.service.findAll(options);
      if (!records) return res.sendError(error);
      return res.sendSuccess(records);
    } catch (error) {
      devLogger.error(error)
      return res.sendError(error);
    }
  }

  async update(req, res) {
    try {
      const updatedRecord = await this.service.update(req.params.id, req.body);
      return res.sendSuccess(updatedRecord);
    } catch (error) {
      devLogger.error(error)
      return res.sendError(error);
    }
  }

  // Eliminar un registro por ID
  async delete(req, res) {
    try {
      const deletedRecord = await this.service.delete(req.params.id);
      return res.sendSuccess(deletedRecord);
    } catch (error) {
      devLogger.error(error)
      return res.sendError(error);
    }
  }
}

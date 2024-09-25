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
      const { scope } = req.query
      const record = await this.service.findById(req.params.id, scope);
      if (!record) return res.sendError(error);
      return res.sendSuccess(record);
    } catch (error) {
      devLogger.debug(error);
      return res.sendError(error);
    }
  }

  async findAll(req, res) {
    try {
      const { scope } = req.query
      const records = await this.service.findAll(scope);
      if (!records) return res.sendError(error);
      return res.sendSuccess(records);
    } catch (error) {
      devLogger.error(error)
      return res.sendError(error);
    }
  }

  async update(req, res) {
    try {
      await this.service.update(req.params.id, req.body);
      return res.sendSuccess('success');
    } catch (error) {
      devLogger.error(error)
      return res.sendError(error);
    }
  }

  // Eliminar un registro por ID
  async delete(req, res) {
    try {
      await this.service.delete(req.params.id);
      return res.sendSuccess('success');
    } catch (error) {
      devLogger.error(error)
      return res.sendError(error);
    }
  }
}

import { devLogger } from '../../config/logger/logger.config.js';
import { userService, ordenServicioService, plantaVerificadoraService } from '../../services/service.js';
import {
  // handleCreate,
  handleGetAll,
  handleGetById,
  // handleUpdate,
  handleDelete,
  handleRestore,
  handleBulkInsert,
} from './helper.controller.js';

export function createActa(service) {
  return async (req, res) => {
    const obj = req.body;
    const userId = req.user.id;
    const orderId = req.params.oid;
    try {
      const user = await userService.getUserById(userId);
      const order = await ordenServicioService.getOrdenServicioById(orderId);
      const planta = await plantaVerificadoraService.getPlantaVerificadoraById(order.PlantaVerificadoraId)
      const updatedOrder = ordenServicioService.updateOrdenServicio(orderId, { estado: "COMPLETA" });
      const newEntity = await service.creategeneric(obj);
      if (newEntity && user && order && updatedOrder) {
        await newEntity.setUser(user);
        await newEntity.setOrdenServicio(order);
        await newEntity.setPlantaVerificadora(planta);

      }
      return res.sendSuccess(newEntity);
    } catch (error) {
      devLogger.error(error);
      return res.sendInternalServerError(error);
    }
  };
}

export function getActaByUserId(service) {
  return async (req, res) => {
    const userId = req.params.uid;
    try {
      const records = await service.getgenericByUserId(userId);
      return res.sendSuccess(records);
    } catch (error) {
      devLogger.error(error);
      return res.sendInternalServerError(error);
    }
  };
}

export function getImgActaById(service) {
  return async (req, res) => {
    const actaId = req.params.aid;
    try {
      const records = await service.findImgByActaIdGeneric(actaId);
      return res.sendSuccess(records);
    } catch (error) {
      devLogger.error(error);
      return res.sendInternalServerError(error);
    }
  };
}

export function getAllActas(service) {
  return (req, res) => handleGetAll(req, res, service.getAllgenerics);
}

export function getActaById(service) {
  return (req, res) => handleGetById(req, res, service.getgenericById);
}

export function getAllDeletedActas(service) {
  return (req, res) => handleGetAll(req, res, service.getAllDeletedgenerics);
}

export function findDeletedActaById(service) {
  return (req, res) => handleGetById(req, res, service.findDeletedgenericById);
}

export function updateActa(service) {
  return async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    try {
      const result = await service.updategeneric(id, updatedData);
      return res.sendSuccess(result);
    } catch (error) {
      devLogger.error(error);
      return res.sendInternalServerError(error);
    }
  };
}

export function deleteActa(service) {
  return (req, res) => handleDelete(req, res, service.deletegeneric);
}

export function restoreActaById(service) {
  return (req, res) => handleRestore(req, res, service.restoregenericById);
}

export function bulkInsertActa(service) {
  return (req, res) => handleBulkInsert(req, res, service.insertInBulkgeneric);
}

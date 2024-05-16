import { devLogger } from '../config/logs/logger.config.js';
import { mantenimientoDeEquipoService } from '../services/repository/services.js';

export async function crearMantenimientoEquipo(req, res) {
  const obj = req.body;
  try {
    const MantenimientoEquipo = await mantenimientoDeEquipoService.createMantenimientoEquipo(obj);
    return res.sendSuccess(MantenimientoEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerMantenimientoEquipos(req, res) {
  try {
    const MantenimientoEquipos = await mantenimientoDeEquipoService.getAllMantenimientoEquipos();
    return res.sendSuccess(MantenimientoEquipos);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerMantenimientoEquiposBorrados(req, res) {
  try {
    const MantenimientoEquipos = await mantenimientoDeEquipoService.getAllDeletedMantenimientoEquipos();
    return res.sendSuccess(MantenimientoEquipos);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerMantenimientoEquipo(req, res) {
  const MantenimientoEquipoId = req.params.id;
  try {
    const MantenimientoEquipo = await mantenimientoDeEquipoService.getMantenimientoEquipoById(MantenimientoEquipoId);
    if (!MantenimientoEquipo) {
      return res.sendClientError('Orden not found');
    }
    return res.sendSuccess(MantenimientoEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerMantenimientoEquipoBorradoPorId(req, res) {
  const MantenimientoEquipoId = req.params.id
  try {
    const MantenimientoEquipo = await mantenimientoDeEquipoService.findDeletedMantenimientoEquipoByID(MantenimientoEquipoId);
    if (!MantenimientoEquipo) {
      return res.sendClientError('Order not found by id');
    }
    return res.sendSuccess(MantenimientoEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function actualizarMantenimientoEquipo(req, res) {
  const MantenimientoEquipoId = req.params.id;
  const updatedData = req.body;
  try {
    const MantenimientoEquipo = await mantenimientoDeEquipoService.updateMantenimientoEquipo(MantenimientoEquipoId, updatedData);
    return res.sendSuccess(MantenimientoEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function eliminarMantenimientoEquipo(req, res) {
  const MantenimientoEquipoId = req.params.id;
  try {
    await mantenimientoDeEquipoService.deleteMantenimientoEquipo(MantenimientoEquipoId);
    return res.sendSuccess({ state: "Order deleted" });
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function restaurarMantenimientoEquipo(req, res) {
  const MantenimientoEquipoId = req.params.id;
  try {
    const MantenimientoEquipo = await mantenimientoDeEquipoService.restoreMantenimientoEquipoById(MantenimientoEquipoId)
    return res.sendSuccess(MantenimientoEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}
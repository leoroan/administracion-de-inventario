import { devLogger } from '../config/logs/logger.config.js';
import { mantenimientoEquipoService } from '../services/repository/mantenimientoEquipo.repository.js';

export async function crearMantenimientoEquipo(req, res) {
  const obj = req.body;
  try {
    const MantenimientoEquipo = await mantenimientoEquipoService.createMantenimientoEquipo(obj);
    return res.sendSuccess(MantenimientoEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerMantenimientoEquipos(req, res) {
  try {
    const MantenimientoEquipos = await mantenimientoEquipoService.getAllMantenimientoEquipos();
    return res.sendSuccess(MantenimientoEquipos);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerMantenimientoEquiposBorrados(req, res) {
  try {
    const MantenimientoEquipos = await mantenimientoEquipoService.getAllDeletedMantenimientoEquipos();
    return res.sendSuccess(MantenimientoEquipos);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerMantenimientoEquipo(req, res) {
  const MantenimientoEquipoId = req.params.id;
  try {
    const MantenimientoEquipo = await mantenimientoEquipoService.getMantenimientoEquipoById(MantenimientoEquipoId);
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
    const MantenimientoEquipo = await mantenimientoEquipoService.findDeletedMantenimientoEquipoByID(MantenimientoEquipoId);
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
    const MantenimientoEquipo = await mantenimientoEquipoService.updateMantenimientoEquipo(MantenimientoEquipoId, updatedData);
    return res.sendSuccess(MantenimientoEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function eliminarMantenimientoEquipo(req, res) {
  const MantenimientoEquipoId = req.params.id;
  try {
    await mantenimientoEquipoService.deleteMantenimientoEquipo(MantenimientoEquipoId);
    return res.sendSuccess({ state: "Place deleted" });
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function restaurarMantenimientoEquipo(req, res) {
  const MantenimientoEquipoId = req.params.id;
  try {
    const MantenimientoEquipo = await mantenimientoEquipoService.restoreMantenimientoEquipoById(MantenimientoEquipoId)
    return res.sendSuccess(MantenimientoEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}
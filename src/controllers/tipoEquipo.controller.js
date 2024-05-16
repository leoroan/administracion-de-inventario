import { devLogger } from '../config/logs/logger.config.js';
import { tipoEquipoService } from '../services/repository/services.js';

export async function crearTipoEquipo(req, res) {
  const obj = req.body;
  try {
    const TipoEquipo = await tipoEquipoService.createTipoEquipo(obj);
    return res.sendSuccess(TipoEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerTipoEquipos(req, res) {
  try {
    const TipoEquipos = await tipoEquipoService.getAllTipoEquipos();
    return res.sendSuccess(TipoEquipos);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerTipoEquiposBorrados(req, res) {
  try {
    const TipoEquipos = await tipoEquipoService.getAllDeletedTipoEquipos();
    return res.sendSuccess(TipoEquipos);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerTipoEquipo(req, res) {
  const TipoEquipoId = req.params.id;
  try {
    const TipoEquipo = await tipoEquipoService.getTipoEquipoById(TipoEquipoId);
    if (!TipoEquipo) {
      return res.sendClientError('Place not found');
    }
    return res.sendSuccess(TipoEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerTipoEquipoBorradoPorId(req, res) {
  const TipoEquipoId = req.params.id
  try {
    const TipoEquipo = await tipoEquipoService.findDeletedTipoEquipoByID(TipoEquipoId);
    if (!TipoEquipo) {
      return res.sendClientError('Place not found by id');
    }
    return res.sendSuccess(TipoEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function actualizarTipoEquipo(req, res) {
  const TipoEquipoId = req.params.id;
  const updatedData = req.body;
  try {
    const TipoEquipo = await tipoEquipoService.updateTipoEquipo(TipoEquipoId, updatedData);
    return res.sendSuccess(TipoEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function eliminarTipoEquipo(req, res) {
  const TipoEquipoId = req.params.id;
  try {
    await tipoEquipoService.deleteTipoEquipo(TipoEquipoId);
    return res.sendSuccess({ state: "Place deleted" });
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function restaurarTipoEquipo(req, res) {
  const TipoEquipoId = req.params.id;
  try {
    const TipoEquipo = await tipoEquipoService.restoreTipoEquipoById(TipoEquipoId)
    return res.sendSuccess(TipoEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}
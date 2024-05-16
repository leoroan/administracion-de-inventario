import { devLogger } from '../config/logs/logger.config.js';
import { modeloEquipoService } from '../services/repository/services.js';

export async function crearModeloEquipo(req, res) {
  const obj = req.body;
  try {
    const ModeloEquipo = await modeloEquipoService.createModeloEquipo(obj);
    return res.sendSuccess(ModeloEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerModeloEquipos(req, res) {
  try {
    const ModeloEquipos = await modeloEquipoService.getAllModeloEquipos();
    return res.sendSuccess(ModeloEquipos);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerModeloEquiposBorrados(req, res) {
  try {
    const ModeloEquipos = await modeloEquipoService.getAllDeletedModeloEquipos();
    return res.sendSuccess(ModeloEquipos);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerModeloEquipo(req, res) {
  const ModeloEquipoId = req.params.id;
  try {
    const ModeloEquipo = await modeloEquipoService.getModeloEquipoById(ModeloEquipoId);
    if (!ModeloEquipo) {
      return res.sendClientError('Model not found');
    }
    return res.sendSuccess(ModeloEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerModeloEquipoBorradoPorId(req, res) {
  const ModeloEquipoId = req.params.id
  try {
    const ModeloEquipo = await modeloEquipoService.findDeletedModeloEquipoByID(ModeloEquipoId);
    if (!ModeloEquipo) {
      return res.sendClientError('Model not found by id');
    }
    return res.sendSuccess(ModeloEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function actualizarModeloEquipo(req, res) {
  const ModeloEquipoId = req.params.id;
  const updatedData = req.body;
  try {
    const ModeloEquipo = await modeloEquipoService.updateModeloEquipo(ModeloEquipoId, updatedData);
    return res.sendSuccess(ModeloEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function eliminarModeloEquipo(req, res) {
  const ModeloEquipoId = req.params.id;
  try {
    await modeloEquipoService.deleteModeloEquipo(ModeloEquipoId);
    return res.sendSuccess({ state: "Model deleted" });
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function restaurarModeloEquipo(req, res) {
  const ModeloEquipoId = req.params.id;
  try {
    const ModeloEquipo = await modeloEquipoService.restoreModeloEquipoById(ModeloEquipoId)
    return res.sendSuccess(ModeloEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}
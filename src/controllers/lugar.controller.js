import { devLogger } from '../config/logs/logger.config.js';
import { lugarService } from '../services/repository/services.js';;

export async function crearLugar(req, res) {
  const { nombre, calle, altura, comentario } = req.body;
  try {
    const lugar = await lugarService.createLugar(nombre, calle, altura, comentario);
    return res.sendSuccess(lugar);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerlugares(req, res) {
  try {
    const lugares = await lugarService.getAllLugares();
    return res.sendSuccess(lugares);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerlugarsBorrados(req, res) {
  try {
    const lugars = await lugarService.getAllDeletedLugares();
    return res.sendSuccess(lugars);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerlugar(req, res) {
  const lugarId = req.params.id;
  try {
    const lugar = await lugarService.getLugarById(lugarId);
    if (!lugar) {
      return res.sendClientError('Place not found');
    }
    return res.sendSuccess(lugar);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerLugarBorradoPorDni(req, res) {
  const lugarId = req.params.id
  try {
    const lugar = await lugarService.findDeletedLugarByID(lugarId);
    if (!lugar) {
      return res.sendClientError('Place not found by id');
    }
    return res.sendSuccess(lugar);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function actualizarlugar(req, res) {
  const lugarId = req.params.id;
  const updatedData = req.body;
  try {
    const lugar = await lugarService.updateLugar(lugarId, updatedData);
    return res.sendSuccess(lugar);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function eliminarlugar(req, res) {
  const lugarId = req.params.id;
  try {
    await lugarService.deleteLugar(lugarId);
    return res.sendSuccess({ state: "Place deleted" });
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function restaurarlugar(req, res) {
  const lugarId = req.params.id;
  try {
    const lugar = await lugarService.restoreLugarById(lugarId)
    return res.sendSuccess(lugar);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}
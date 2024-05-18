import { devLogger } from '../config/logs/logger.config.js';
import { lugarService, oficinaService } from '../services/repository/services.js';

export async function crearLugar(req, res) {
  const obj = req.body;
  try {
    const lugar = await lugarService.createLugar(obj);
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

export async function obtenerlugaresBorrados(req, res) {
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

export async function obtenerLugarBorradoPorId(req, res) {
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

export async function agregarOficinaAlugar(req, res) {
  const lugarId = req.params.lugarId;
  const oficinaId = req.params.oficinaId;
  try {
    const lugar = await lugarService.getLugarById(lugarId);
    if (!lugar) {
      return res.sendClientError('Place not found');
    }
    const oficina = await oficinaService.getOficinaById(oficinaId);
    if (!oficina) {
      return res.sendClientError('Office not found');
    }
    await lugar.addOficina(oficina)
    return res.sendSuccess(lugar);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}
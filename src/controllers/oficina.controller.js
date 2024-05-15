import { devLogger } from '../config/logs/logger.config.js';
import { oficinaService } from '../services/repository/services.js';

export async function crearOficina(req, res) {
  const { nombre, descripcion, telefono, email } = req.body;
  try {
    const Oficina = await oficinaService.createOficina(nombre, descripcion, telefono, email);
    return res.sendSuccess(Oficina);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerOficinas(req, res) {
  try {
    const Oficinas = await oficinaService.getAllOficinas();
    return res.sendSuccess(Oficinas);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerOficinasBorrados(req, res) {
  try {
    const Oficinas = await oficinaService.getAllDeletedOficinas();
    return res.sendSuccess(Oficinas);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerOficina(req, res) {
  const OficinaId = req.params.id;
  try {
    const Oficina = await oficinaService.getOficinaById(OficinaId);
    if (!Oficina) {
      return res.sendClientError('Office not found');
    }
    return res.sendSuccess(Oficina);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerOficinaBorradoPorId(req, res) {
  const OficinaId = req.params.id
  try {
    const Oficina = await oficinaService.findDeletedOficinaByID(OficinaId);
    if (!Oficina) {
      return res.sendClientError('Office not found by id');
    }
    return res.sendSuccess(Oficina);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function actualizarOficina(req, res) {
  const OficinaId = req.params.id;
  const updatedData = req.body;
  try {
    const Oficina = await oficinaService.updateOficina(OficinaId, updatedData);
    return res.sendSuccess(Oficina);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function eliminarOficina(req, res) {
  const OficinaId = req.params.id;
  try {
    await oficinaService.deleteOficina(OficinaId);
    return res.sendSuccess({ state: "Office deleted" });
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function restaurarOficina(req, res) {
  const OficinaId = req.params.id;
  try {
    const Oficina = await oficinaService.restoreOficinaById(OficinaId)
    return res.sendSuccess(Oficina);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}
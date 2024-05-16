import { devLogger } from '../config/logs/logger.config.js';
import { marcaEquipoService } from '../services/repository/services.js';

export async function crearMarcaEquipo(req, res) {
  const obj = req.body;
  try {
    const MarcaEquipo = await marcaEquipoService.createMarcaEquipo(obj);
    return res.sendSuccess(MarcaEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerMarcaEquipos(req, res) {
  try {
    const MarcaEquipos = await marcaEquipoService.getAllMarcaEquipos();
    return res.sendSuccess(MarcaEquipos);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerMarcaEquiposBorrados(req, res) {
  try {
    const MarcaEquipos = await marcaEquipoService.getAllDeletedMarcaEquipos();
    return res.sendSuccess(MarcaEquipos);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerMarcaEquipo(req, res) {
  const MarcaEquipoId = req.params.id;
  try {
    const MarcaEquipo = await marcaEquipoService.getMarcaEquipoById(MarcaEquipoId);
    if (!MarcaEquipo) {
      return res.sendClientError('Brand not found');
    }
    return res.sendSuccess(MarcaEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerMarcaEquipoBorradoPorId(req, res) {
  const MarcaEquipoId = req.params.id
  try {
    const MarcaEquipo = await marcaEquipoService.findDeletedMarcaEquipoByID(MarcaEquipoId);
    if (!MarcaEquipo) {
      return res.sendClientError('Brand not found by id');
    }
    return res.sendSuccess(MarcaEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function actualizarMarcaEquipo(req, res) {
  const MarcaEquipoId = req.params.id;
  const updatedData = req.body;
  try {
    const MarcaEquipo = await marcaEquipoService.updateMarcaEquipo(MarcaEquipoId, updatedData);
    return res.sendSuccess(MarcaEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function eliminarMarcaEquipo(req, res) {
  const MarcaEquipoId = req.params.id;
  try {
    await marcaEquipoService.deleteMarcaEquipo(MarcaEquipoId);
    return res.sendSuccess({ state: "Brand deleted" });
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function restaurarMarcaEquipo(req, res) {
  const MarcaEquipoId = req.params.id;
  try {
    const MarcaEquipo = await marcaEquipoService.restoreMarcaEquipoById(MarcaEquipoId)
    return res.sendSuccess(MarcaEquipo);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}
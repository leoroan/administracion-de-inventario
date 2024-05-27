import { devLogger } from '../config/logs/logger.config.js';
import { empleadoService, equipoInformaticoService, oficinaService } from '../services/repository/services.js';

export async function crearOficina(req, res) {
  const obj = req.body;
  try {
    const Oficina = await oficinaService.createOficina(obj);
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

export async function agregarEmpleadoAoficina(req, res) {
  const oficinaId = req.params.oficinaId;
  const empleadoId = req.params.empleadoId;
  try {
    const oficina = await oficinaService.getOficinaById(oficinaId);
    const empleado = await empleadoService.getEmpleadoById(empleadoId);
    await oficina.addEmpleado(empleado)
    return res.sendSuccess(oficina);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function agregarEquipoAoficina(req, res) {
  const oficinaId = req.params.oficinaId;
  const equipoId = req.params.equipoId;
  try {
    const oficina = await oficinaService.getOficinaById(oficinaId);
    const equipo = await equipoInformaticoService.getEquipoInformaticoById(equipoId);
    await equipoInformaticoService.updateEquipoInformatico(equipoId, { "estado": "ASIGNADO" });
    await oficina.addEquipoInformatico(equipo);
    await equipo.addOficina(oficina);
    return res.sendSuccess(oficina);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function removerEquipoAoficina(req, res) {
  const oficinaId = req.params.oficinaId;
  const equipoId = req.params.equipoId;
  try {
    const oficina = await oficinaService.getOficinaById(oficinaId);
    const equipo = await equipoInformaticoService.getEquipoInformaticoById(equipoId);
    await equipoInformaticoService.updateEquipoInformatico(equipoId, { "estado": "DISPONIBLE" });
    await oficina.removeEquipoInformatico(equipo);
    await equipo.setOficinas(null);
    return res.sendSuccess(oficina);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function agregarOficinaAoficina(req, res) {
  const unaOficinaId = req.params.unaOficinaId;
  const otraOficinaId = req.params.otraOficinaId;
  try {
    const unaOficina = await oficinaService.getOficinaById(unaOficinaId);
    const otraOficina = await oficinaService.getOficinaById(otraOficinaId);
    await unaOficina.addDependencias(otraOficina)
    return res.sendSuccess(unaOficina);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

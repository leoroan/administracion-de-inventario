import { devLogger } from '../config/logs/logger.config.js';
import { EquipoInformaticoDTO } from '../services/db/dto/equipoInformatico.dto.js';
import { equipoInformaticoService } from '../services/repository/services.js';

export async function crearEquipoInformatico(req, res) {
  const { mt, marca, numeroDeSerie, modelo, numeroDePatrimonio, estado, observacion, especificacionesTecnicas, precio, remitoNumero } = req.body;
  try {
    const equipoInformatico = await equipoInformaticoService.createEquipoInformatico(mt, marca, numeroDeSerie, modelo, numeroDePatrimonio, estado, observacion, especificacionesTecnicas, precio, remitoNumero);
    return res.sendSuccess(equipoInformatico);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerEquiposInformaticos(req, res) {
  try {
    const equiposInformaticos = await equipoInformaticoService.getAllEquipoInformaticos();
    // const equiposInformaticosDTO = equiposInformaticos.map(equipoInformatico => new EquipoInformaticoDTO(equipoInformatico.dataValues.id, equipoInformatico.dataValues.mt, equipoInformatico.dataValues.estado, equipoInformatico.TipoEquipo, equipoInformatico.Empleado, equipoInformatico.Oficinas, equipoInformatico.dataValues.updatedAt));
    return res.sendSuccess(equiposInformaticos);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError();
  }
}

export async function obtenerEquiposInformaticosBorrados(req, res) {
  try {
    const equiposInformaticos = await equipoInformaticoService.getAllDeletedEquipoInformaticos();
    return res.sendSuccess(equiposInformaticos);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerEquipoInformatico(req, res) {
  const equipoInformaticoId = req.params.id;
  try {
    const equipoInformatico = await equipoInformaticoService.getEquipoInformaticoById(equipoInformaticoId);
    if (!equipoInformatico) {
      return res.sendClientError('hardware not found');
    }
    return res.sendSuccess(equipoInformatico);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerEquipoInformaticoBorradoPorID(req, res) {
  const equipoInformaticoId = req.params.id
  try {
    const equipoInformatico = await equipoInformaticoService.findDeletedEquipoInformaticoByID(equipoInformaticoId);
    if (!equipoInformatico) {
      return res.sendClientError('Ex-Hardware not found by id');
    }
    // const empleadoDTO = new EmpleadoDTO(empleado.id, empleado.nombre, empleado.apellido, empleado.telefono, empleado.dni, empleado.rol, empleado.email, empleado.EquipoInformaticos);
    return res.sendSuccess(equipoInformatico);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function actualizarEquipoInformatico(req, res) {
  const equipoInformaticoId = req.params.id;
  const updatedData = req.body;
  try {
    const equipoInformatico = await equipoInformaticoService.updateEquipoInformatico(equipoInformaticoId, updatedData);
    return res.sendSuccess(equipoInformatico);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function eliminarEquipoInformatico(req, res) {
  const equipoInformaticoId = req.params.id;
  try {
    await equipoInformaticoService.deleteEquipoInformatico(equipoInformaticoId);
    return res.sendSuccess({ state: "Hardware deleted" });
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function restaurarEquipoInformatico(req, res) {
  const equipoInformaticoId = req.params.id;
  try {
    const equipoInformatico = await equipoInformaticoService.restoreEquipoInformaticoById(equipoInformaticoId);
    return res.sendSuccess(equipoInformatico);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function asignarTipoEquipoAequipo(req, res) {
  const equipoInformaticoId = req.params.eid;
  const tipoEquipoId = req.params.tid;
  try {
    const equipoInformatico = await equipoInformaticoService.getEquipoInformaticoById(equipoInformaticoId);
    if (!equipoInformatico) {
      return res.sendClientError('hardware not found');
    }
    const tipoEquipo = await tipoEquipoService.getTipoEquipoById(tipoEquipoId);
    if (!tipoEquipo) {
      return res.sendClientError(error);
    }
    equipoInformatico.setTipoEquipo(tipoEquipo);
    return res.sendSuccess(equipoInformatico);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}


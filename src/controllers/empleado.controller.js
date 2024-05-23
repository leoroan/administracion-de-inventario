import { devLogger } from '../config/logs/logger.config.js';
import { EmpleadoDTO } from '../services/db/dto/empleado.dto.js';
import { empleadoService, equipoInformaticoService, oficinaService } from '../services/repository/services.js';

export async function crearEmpleado(req, res) {
  const obj = req.body; try {
    const empleado = await empleadoService.createEmpleado(obj);
    return res.sendSuccess(empleado);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerEmpleados(req, res) {
  try {
    const empleados = await empleadoService.getAllEmpleados();
    return res.sendSuccess(empleados);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerEmpleadosBorrados(req, res) {
  try {
    const empleados = await empleadoService.getAllDeletedEmpleados();
    return res.sendSuccess(empleados);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerEmpleado(req, res) {
  const empleadoId = req.params.id;
  try {
    const empleado = await empleadoService.getEmpleadoById(empleadoId);
    if (!empleado) {
      return res.sendClientError('Employee not found');
    }
    // const empleadoDTO = new EmpleadoDTO(empleado.id, empleado.nombre, empleado.apellido, empleado.telefono, empleado.dni, empleado.rol, empleado.email, empleado.EquipoInformaticos);
    return res.sendSuccess(empleado);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function obtenerEmpleadoBorradoPorDni(req, res) {
  const empleadoDni = req.params.dni
  try {
    const empleado = await empleadoService.findDeletedEmpleadoByDni(empleadoDni);
    if (!empleado) {
      return res.sendClientError('Employee not found by dni');
    }
    const empleadoDTO = new EmpleadoDTO(empleado.id, empleado.nombre, empleado.apellido, empleado.telefono, empleado.dni, empleado.rol, empleado.email, empleado.EquipoInformaticos);
    return res.sendSuccess(empleadoDTO);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function actualizarEmpleado(req, res) {
  const empleadoId = req.params.id;
  const updatedData = req.body;
  try {
    const empleado = await empleadoService.updateEmpleado(empleadoId, updatedData);
    return res.sendSuccess(empleado);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function eliminarEmpleado(req, res) {
  const empleadoId = req.params.id;
  try {
    const empleado = await empleadoService.getEmpleadoById(empleadoId, { include: 'EquipoInformaticos' });
    if (empleado.EquipoInformaticos.length > 0) {
      res.sendClientError('Employee has hardware assigned');
    } else {
      await empleadoService.deleteEmpleado(empleadoId);
      return res.sendSuccess({ state: "Employee deleted" });
    }
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function asignarEquipoAempleado(req, res) {
  const empleadoId = req.params.empleadoId;
  const equipoInformaticoId = req.params.equipoId;
  try {
    const empleado = await empleadoService.getEmpleadoById(empleadoId, { include: 'EquipoInformaticos' });
    const equipoInformatico = await equipoInformaticoService.getEquipoInformaticoById(equipoInformaticoId);
    if (equipoInformatico.Empleado) {
      res.sendClientError('hardware is already assigned to another employee');
    }
    await equipoInformaticoService.updateEquipoInformatico(equipoInformaticoId, { "estado": "ASIGNADO" });
    empleado.addEquipoInformaticos(equipoInformatico);
    res.sendSuccess({ state: "hardware assigned to employee" });
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
};

export async function asignarOficinaAempleado(req, res) {
    const empleadoId = req.params.empleadoId;
    const oficinaId = req.params.oficinaId;
    try {
      const empleado = await empleadoService.getEmpleadoById(empleadoId, { include: 'Oficina' });
      const oficina = await oficinaService.getOficinaById(oficinaId);
      if (empleado.Oficina) {
        res.sendClientError('office is already assigned to another employee');
      }
      empleado.setOficina(oficina);
      res.sendSuccess({ state: "office assigned to employee" });
    } catch (error) {
      devLogger.error(error);
      return res.sendInternalServerError(error);
    }
}

export async function removerEquipoAempleado(req, res) {
  const empleadoId = req.params.empleadoId;
  const equipoInformaticoId = req.params.equipoId;
  try {
    const empleado = await empleadoService.getEmpleadoById(empleadoId, { include: 'EquipoInformaticos' });
    const equipoInformatico = await equipoInformaticoService.getEquipoInformaticoById(equipoInformaticoId);
    if (!equipoInformatico.Empleado) {
      res.sendClientError('hardware is not assigned to any employee');
    }
    await equipoInformaticoService.updateEquipoInformatico(equipoInformaticoId, { "estado": "DISPONIBLE" });
    empleado.removeEquipoInformaticos(equipoInformatico);
    res.sendSuccess({ state: "hardware removed from employee" });
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function restaurarEmpleado(req, res) {
  const empleadoId = req.params.id;
  try {
    const empleado = await empleadoService.restoreEmpleadoById(empleadoId)
    return res.sendSuccess(empleado);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function agregarEnBloque(req, res) {
  const empleados = req.body;
  try {
    const nuevosEmpleados = await empleadoService.insertInBulk(empleados);
    return res.sendSuccess(nuevosEmpleados);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}
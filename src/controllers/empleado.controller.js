import { devLogger } from '../config/logs/logger.config.js';
import { EmpleadoDTO } from '../services/db/dto/empleado.dto.js';
import { equipoInformaticoService } from '../services/repository/services.js';
import { empleadoService } from '../services/repository/services.js';

export async function crearEmpleado(req, res) {
  const obj = req.body;  try {
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
    await empleadoService.deleteEmpleado(empleadoId);
    return res.sendSuccess({ state: "Employee deleted" });
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

export async function asignarEquipoAempleado(req, res) {
  const empleadoId = req.params.empId;
  const equipoInformaticoId = req.params.eqId;

  try {
    const empleado = await empleadoService.getEmpleadoById(empleadoId, { include: 'EquipoInformaticos' });
    if (!empleado) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    const equipoInformatico = await equipoInformaticoService.getEquipoInformaticoById(equipoInformaticoId);
    if (!equipoInformatico) {
      return res.status(404).json({ error: 'hardware not found' });
    }
    if (equipoInformatico.Empleado) {
      return res.status(400).json({ error: 'hardware is already assigned to another employee', payload: equipoInformatico.Empleado }); // Verificar si el hardware ya está asignado a un empleado.
    }
    empleado.addEquipoInformaticos(equipoInformatico);
    return res.status(200).json({ payload: 'hardware assigned to employee' });
  } catch (error) {
    console.error('Error adding hardware to employee:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

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
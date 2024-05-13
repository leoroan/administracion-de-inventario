import { devLogger } from '../config/logs/logger.config.js';
import { createEmpleado, getEmpleadoById, updateEmpleado, deleteEmpleado, getAllEmpleados } from '../services/db/dao/empleado.dao.js';
import { getEquipoInformaticoById } from '../services/db/dao/equipoInformatico.dao.js';
import { EmpleadoDTO } from '../services/db/dto/empleado.dto.js';

async function crearEmpleado(req, res) {
  const { nombre, apellido, telefono, dni, rol, email } = req.body;

  try {
    const empleado = await createEmpleado(nombre, apellido, telefono, dni, rol, email);
    return res.status(201).json(empleado);
  } catch (error) {
    devLogger.error(error);
    return res.status(500).json({ error: 'Internal server error', detalle: error.detalle});
  }
}

async function obtenerEmpleados(req, res) {
  try {
    const empleados = await getAllEmpleados();
    return res.json(empleados);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function obtenerEmpleado(req, res) {
  const empleadoId = req.params.id;

  try {
    const empleado = await getEmpleadoById(empleadoId);
    if (!empleado) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    // Estructurar los datos del empleado utilizando el DTO
    const empleadoDTO = new EmpleadoDTO(empleado.id, empleado.nombre, empleado.apellido, empleado.telefono, empleado.dni, empleado.rol, empleado.email, empleado.EquipoInformaticos);
    return res.json(empleadoDTO);
  } catch (error) {
    console.error('Error fetching employee:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function actualizarEmpleado(req, res) {
  const empleadoId = req.params.id;
  const updatedData = req.body;

  try {
    const empleado = await updateEmpleado(empleadoId, updatedData);
    // const empleadoDTO = new EmpleadoDTO(empleado.id, empleado.nombre, empleado.apellido, empleado.dni, empleado.rol, empleado.email);
    return res.json(empleado);
  } catch (error) {
    console.error('Error updating employee:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function eliminarEmpleado(req, res) {
  const empleadoId = req.params.id;

  try {
    await deleteEmpleado(empleadoId);
    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting employee:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function asignarEquipoAempleado(req, res) {
  const empleadoId = req.params.empId;
  const equipoInformaticoId = req.params.eqId;

  try {
    const empleado = await getEmpleadoById(empleadoId, { include: 'EquipoInformaticos' });
    if (!empleado) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    const equipoInformatico = await getEquipoInformaticoById(equipoInformaticoId);
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

export { crearEmpleado, obtenerEmpleados, obtenerEmpleado, actualizarEmpleado, eliminarEmpleado, asignarEquipoAempleado };
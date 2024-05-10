import { Router } from "express";
import {
  crearEmpleado,
  obtenerEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
  asignarEquipoAempleado,
  obtenerEmpleados
} from '../controllers/empleado.controller.js';

const router = Router();

router.post('/', crearEmpleado);
router.post('/add/:empId/:eqId', asignarEquipoAempleado);
router.get('/:id', obtenerEmpleado);
router.get('/', obtenerEmpleados);
router.put('/:id', actualizarEmpleado);
router.delete('/:id', eliminarEmpleado);

export default router;
import { Empleado } from "./db/models/Empleado.model.js";
import EmpleadoDAO from "./db/dao/empleado.dao.js";
import EmpleadoRepository from "./repository/empleado.repository.js";

const empleadoDAO = new EmpleadoDAO(Empleado);
export const empleadoService = new EmpleadoRepository(empleadoDAO);
import EmpleadoDao from "../db/dao/empleado.dao.js";
import EmpleadoRepository from "./empleado.repository.js";
import EquipoInformaticoDao from "../db/dao/equipoInformatico.dao.js";
import EquipoInformaticoRepository from "./equipoInformatico.repository.js";

const empleadoDao = new EmpleadoDao();
const equipoInformaticoDao = new EquipoInformaticoDao();

export const empleadoService = new EmpleadoRepository(empleadoDao);
export const equipoInformaticoService = new EquipoInformaticoRepository(equipoInformaticoDao);
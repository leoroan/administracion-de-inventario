import EmpleadoDao from "../db/dao/empleado.dao.js";
import EmpleadoRepository from "./empleado.repository.js";
import EquipoInformaticoDao from "../db/dao/equipoInformatico.dao.js";
import EquipoInformaticoRepository from "./equipoInformatico.repository.js";
import LugarDao from "../db/dao/lugar.dao.js";
import LugarRepository from "./lugar.repository.js";
import OficinaDao from "../db/dao/oficina.dao.js";
import OficinaRepository from "./oficina.repository.js";

const empleadoDao = new EmpleadoDao();
const equipoInformaticoDao = new EquipoInformaticoDao();
const lugarDao = new LugarDao();
const oficinaDao = new OficinaDao();

export const empleadoService = new EmpleadoRepository(empleadoDao);
export const equipoInformaticoService = new EquipoInformaticoRepository(equipoInformaticoDao);
export const lugarService = new LugarRepository(lugarDao);
export const oficinaService = new OficinaRepository(oficinaDao);
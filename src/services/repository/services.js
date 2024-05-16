import EmpleadoDao from "../db/dao/empleado.dao.js";
import EmpleadoRepository from "./empleado.repository.js";
import EquipoInformaticoDao from "../db/dao/equipoInformatico.dao.js";
import EquipoInformaticoRepository from "./equipoInformatico.repository.js";
import LugarDao from "../db/dao/lugar.dao.js";
import LugarRepository from "./lugar.repository.js";
import OficinaDao from "../db/dao/oficina.dao.js";
import OficinaRepository from "./oficina.repository.js";
import TipoEquipoDao from "../db/dao/tipoEquipo.dao.js";
import TipoEquipoRepository from "./tipoEquipo.repository.js";
import MantenimientoEquipoDao from "../db/dao/mantenimiento.dao.js";
import MantenimientoEquipoRepository from "./mantenimientoEquipo.repository.js";

const empleadoDao = new EmpleadoDao();
const equipoInformaticoDao = new EquipoInformaticoDao();
const lugarDao = new LugarDao();
const oficinaDao = new OficinaDao();
const tipoEquipoDao = new TipoEquipoDao();
const mantenimientoEquipoDao = new MantenimientoEquipoDao();

export const empleadoService = new EmpleadoRepository(empleadoDao);
export const equipoInformaticoService = new EquipoInformaticoRepository(equipoInformaticoDao);
export const lugarService = new LugarRepository(lugarDao);
export const oficinaService = new OficinaRepository(oficinaDao);
export const tipoEquipoService = new TipoEquipoRepository(tipoEquipoDao);
export const mantenimientoEquipoService = new MantenimientoEquipoRepository(mantenimientoEquipoDao);
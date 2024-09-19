import { Edificio } from "./db/models/Edificio.model.js";
import { Empleado } from "./db/models/Empleado.model.js";
import { EquipoInformatico } from "./db/models/EquipoInformatico.model.js";
import { Marca } from "./db/models/marca.model.js";
import { Modelo } from "./db/models/modelo.model.js";
import { Oficina } from "./db/models/oficina.model.js";
import { RegistroDeMantenimientoDeEquipo } from "./db/models/registroDeMantenimientoDeEquipo.model.js";
import { TipoEquipo } from "./db/models/tipoEquipo.model.js";
import { Session } from "./db/models/session.model.js";

import EdificioDAO from "./db/dao/edificio.dao.js";
import EmpleadoDAO from "./db/dao/empleado.dao.js";
import EquipoInformaticoDAO from "./db/dao/equipoInformatico.dao.js";
import MarcaDAO from "./db/dao/marca.dao.js";
import ModeloDAO from "./db/dao/modelo.dao.js";
import OficinaDAO from "./db/dao/oficina.dao.js";
import RegistroDeMantenimientoDeEquipoDAO from "./db/dao/registroDeMantenimientoDeEquipo.dao.js";
import TipoEquipoDAO from "./db/dao/tipoEquipo.dao.js";
import SessionDAO from "./db/dao/session.dao.js";

import EdificioRepository from "./repository/edificio.repository.js";
import EmpleadoRepository from "./repository/empleado.repository.js";
import EquipoInformaticoRepository from "./repository/equipoInformatico.repository.js";
import MarcaRepository from "./repository/marca.repository.js";
import ModeloRepository from "./repository/modelo.repository.js";
import OficinaRepository from "./repository/oficina.repository.js";
import RegistroDeMantenimientoDeEquipoRepository from "./repository/registroDeMantenimientoDeEquipo.repository.js";
import TipoEquipoRepository from "./repository/tipoEquipo.repository.js";
import SessionRepository from "./repository/session.repository.js";

const edificioDAO = new EdificioDAO(Edificio);
const empleadoDAO = new EmpleadoDAO(Empleado);
const equipoInformaticoDAO = new EquipoInformaticoDAO(EquipoInformatico);
const marcaDAO = new MarcaDAO(Marca);
const modeloDAO = new ModeloDAO(Modelo);
const oficinaDAO = new OficinaDAO(Oficina);
const registroDeMantenimientoDeEquipoDAO = new RegistroDeMantenimientoDeEquipoDAO(RegistroDeMantenimientoDeEquipo);
const tipoEquipoDAO = new TipoEquipoDAO(TipoEquipo);
const sessionDAO = new SessionDAO(Session);

export const edificioService = new EdificioRepository(edificioDAO);
export const empleadoService = new EmpleadoRepository(empleadoDAO);
export const equipoInformaticoService = new EquipoInformaticoRepository(equipoInformaticoDAO);
export const marcaService = new MarcaRepository(marcaDAO);
export const modeloService = new ModeloRepository(modeloDAO);
export const oficinaService = new OficinaRepository(oficinaDAO);
export const registroDeMantenimientoDeEquipoService = new RegistroDeMantenimientoDeEquipoRepository(registroDeMantenimientoDeEquipoDAO);
export const tipoEquipoService = new TipoEquipoRepository(tipoEquipoDAO);
export const sessionService = new SessionRepository(sessionDAO);

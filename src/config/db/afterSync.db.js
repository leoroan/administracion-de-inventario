import { marcasPredeterminadas } from "../../db_defaults/marcasYmodelos.def.js";
import { rolesPredeterminados } from "../../db_defaults/roles.def.js";
import { tiposDeEquiposPredeterminados } from "../../db_defaults/tipoDeEquipos.def.js";
import { oficinasPredeterminadas } from "../../db_defaults/oficinasYdependencias.def.js";
import { edificiosPredeterminados } from "../../db_defaults/edificios.def.js";
import { Oficina } from "../../services/db/models/oficina.model.js";
import { Empleado } from "../../services/db/models/Empleado.model.js";
import { Marca } from "../../services/db/models/marca.model.js";
import { Modelo } from "../../services/db/models/modelo.model.js";
import { Rol } from "../../services/db/models/rol.model.js";
import { TipoEquipo } from "../../services/db/models/tipoEquipo.model.js";
import { createHash } from "../../utils/bcrypt.js";
import { devLogger } from "../logger/logger.config.js";
import { Edificio } from "../../services/db/models/Edificio.model.js";

export const afterSync = async (param) => {
  await addEdificios();
  await addOficinas();
  await addAdmin();
  await addMarcas();
  await addRoles();
  await addTipos();
  devLogger.info('[DB-DEFAULT-SYNC]: Ready.');
}

const addAdmin = async () => {
  const [rolAdmin] = await Rol.findOrCreate({ where: { nombre: 'ADMIN' }, defaults: { nivel: 1 } });
  await Empleado.findOrCreate({
    where: { nombre: 'Administrador' },
    defaults: {
      username: process.env.ADMIN_USER,
      password: createHash(process.env.ADMIN_PASS),
      email: process.env.ADMIN_EMAIL,
      nombre: 'Administrador',
      apellido: 'General',
      dni: '00000000',
      rolId: rolAdmin.id
    }
  });
  devLogger.info('[ADMIN]: Ready.');
}

const addOficinas = async () => {
  for (const oficina of oficinasPredeterminadas) {
    const [oficinaCreada] = await Oficina.findOrCreate({ where: { nombre: oficina.nombre } });
    for (const nombreDependencia of oficina.dependencias) {
      await Oficina.findOrCreate({
        where: {
          nombre: nombreDependencia,
          oficinaPadreId: oficinaCreada.id
        }
      });
    }
  }
}

const addMarcas = async () => {
  for (const marca of marcasPredeterminadas) {
    const [marcaCreada] = await Marca.findOrCreate({ where: { nombre: marca.nombre } });
    for (const nombreModelo of marca.modelos) {
      await Modelo.findOrCreate({
        where: {
          nombre: nombreModelo,
          marcaId: marcaCreada.id
        }
      });
    }
  }
}

const addEdificios = async () => {
  for (const edificio of edificiosPredeterminados) {
    await Edificio.findOrCreate({ where: { nombre: edificio.nombre } });
  }
}

const addRoles = async () => {
  for (const rol of rolesPredeterminados) {
    await Rol.findOrCreate({ where: { nombre: rol.nombre }, defaults: rol });
  }
}

const addTipos = async () => {
  for (const tipo of tiposDeEquiposPredeterminados) {
    await TipoEquipo.findOrCreate({ where: { nombre: tipo.nombre }, defaults: tipo });
  }
}


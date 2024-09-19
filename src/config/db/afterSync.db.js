import { marcasPredeterminadas } from "../../db_defaults/marcasYmodelos.def.js";
import { rolesPredeterminados } from "../../db_defaults/roles.def.js";
import { Empleado } from "../../services/db/models/Empleado.model.js";
import { Marca } from "../../services/db/models/marca.model.js";
import { Modelo } from "../../services/db/models/modelo.model.js";
import { Rol } from "../../services/db/models/rol.model.js";
import { createHash } from "../../utils/bcrypt.js";
import { devLogger } from "../logger/logger.config.js";

export const afterSync = async (param) => {
  await addAdmin();
  await addMarcas();
  await addRoles();
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

export const addRoles = async () => {
  for (const rol of rolesPredeterminados) {
    await Rol.findOrCreate({ where: { nombre: rol.nombre }, defaults: rol });
  }
}
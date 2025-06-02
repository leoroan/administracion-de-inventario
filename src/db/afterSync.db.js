import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { models } from "../config/db/sequelize.config.js"
import { devLogger } from "../config/logger/logger.config.js";
import { createHash } from "../utils/bcrypt.js";
import { rolesPredeterminados } from './db_defaults/roles.def.js';

export const afterSync = async () => {
  await addRoles();
  await addAdmin();
  // await addEdificios();
  // await addOficinas();
  // await addTipos();
  // await addMarcas();
  devLogger.info('[DATOS REQUERIDOS, PRECARGADOS EN BDD]: ✅  Sincronizados.');
}

const addRoles = async () => {
  for (const rol of rolesPredeterminados) {
    await models.Rol.findOrCreate({ where: { nombre: rol.nombre }, defaults: rol });
  }
}

const addAdmin = async () => {
  const [rolAdmin] = await models.Rol.findOrCreate({ where: { nombre: 'ADMIN' }, defaults: { nivel: 1 } });
  await models.Usuario.findOrCreate({
    where: { nombre: 'Administrador' },
    defaults: {
      username: process.env.ADMIN_USER,
      password: createHash(process.env.ADMIN_PASS),
      email: process.env.ADMIN_EMAIL,
      nombre: 'Administrador',
      apellido: 'General',
      dni: '00000000',
      rolId: rolAdmin.dataValues.id
    }
  });
  devLogger.info('[USUARIO DEV]:✅ :[' + process.env.ADMIN_USER + ']');
}



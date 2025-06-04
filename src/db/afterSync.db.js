import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { models } from "../config/db/sequelize.config.js"
import { devLogger } from "../config/logger/logger.config.js";
import { createHash } from "../utils/bcrypt.js";
import { rolesPredeterminados } from './db_defaults/rolesPredeterminados.def.js';
import { edificiosPredeterminados } from './db_defaults/edificiosPredeterminados.def.js';
import { oficinasPredeterminadas } from './db_defaults/oficinasPredeterminadas.def.js';
import { marcasYmodelosPredeterminados } from './db_defaults/marcasYmodelosPredeterminados.def.js';
import { tiposDeEquiposPredeterminados } from './db_defaults/tiposDeEquiposPredeterminados.def.js';

export const afterSync = async () => {
  await addRoles();
  await addAdmin();
  await addTipos();
  await addEdificios();
  await addOficinas();
  await addMarcas();
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


const addEdificios = async () => {
  for (const edificio of edificiosPredeterminados) {
    await models.Edificio.findOrCreate({ where: { nombre: edificio.nombre }, defaults: edificio });
  }
}

const addTipos = async () => {
  for (const tipo of tiposDeEquiposPredeterminados) {
    await models.Tipoequipo.findOrCreate({ where: { nombre: tipo.nombre }, defaults: tipo });
  }
}

const addOficinas = async () => {
  for (const oficina of oficinasPredeterminadas) {
    const [oficinaCreada] = await models.Oficina.findOrCreate({ where: { nombre: oficina.nombre } });
    for (const nombreDependencia of oficina.dependencias) {
      await models.Oficina.findOrCreate({
        where: {
          nombre: nombreDependencia,
          oficinaPadreId: oficinaCreada.id
        }
      });
    }
  }
}


const addMarcas = async () => {
  for (const marca of marcasYmodelosPredeterminados) {
    const [marcaCreada] = await models.Marca.findOrCreate({
      where: { nombre: marca.nombre },
      defaults: {
        descripcion: marca.descripcion,
      }
    });

    for (const modelo of marca.modelos) {
      await models.Modelo.findOrCreate({
        where: {
          nombre: modelo.nombre,
          marcaId: marcaCreada.id,
          tipoequipoId: modelo.tipoequipoId
        },
        defaults: {
          descripcion: modelo.descripcion,
          tipoequipoId: modelo.tipoequipoId
        }
      });
    }
  }
};

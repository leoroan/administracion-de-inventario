// db/afterSync.js
import { models } from "../config/db/sequelize.config.js";
import { devLogger } from "../config/logger/logger.config.js";
import { createHash } from "../utils/bcrypt.js";
import { rolesPermisos } from "../utils/rolesPermisos.config.js";
import { edificiosPredeterminados } from './db_defaults/edificiosPredeterminados.def.js';
import { oficinasPredeterminadas } from './db_defaults/oficinasPredeterminadas.def.js';
import { marcasYmodelosPredeterminados } from './db_defaults/marcasYmodelosPredeterminados.def.js';
import { tiposDeEquiposPredeterminados } from './db_defaults/tiposDeEquiposPredeterminados.def.js';

export const afterSync = async () => {
  try {
    await addRoles();
    await addPermisos();
    const adminUser = await addAdmin();
    await assignAllPermisosToAdmin(adminUser);
    await addTipos();
    await addEdificios();
    await addOficinas();
    await addMarcas();

    devLogger.info('✅ [DATOS PRECARGADOS] Roles, permisos y admin listos');
  } catch (err) {
    devLogger.error("💥 [afterSync] Error precargando datos:", err);
    throw err;
  }
};

// -------------------- Funciones auxiliares --------------------

const addRoles = async () => {
  const roleNames = Object.keys(rolesPermisos);

  for (const nombre of roleNames) {
    const defaultPermisos = rolesPermisos[nombre];
    await models.Rol.findOrCreate({
      where: { nombre },
      defaults: { nombre, defaultPermisos },
    });
  }
};

const addPermisos = async () => {
  const manualResources = ["Log", "Session", "Health"];
  const extraPermisos = {
    Usuario: ["update.restore", "create.asignar.Oficina", "create.asignar.Equipo"],
    Session: ["create.register"],
    Log: ["read.list", "read.file", "read.download"],
    Tipoequipo: ["create.asignar.Equipo"],
    Rol: ["update.restore"],
    Oficina: ["create.asignar.Empleado", "create.asignar.Oficina", "create.asignar.Edificio", "create.asignar.Equipo"],
    Modelo: ["create.asignar.Marca", "create.asignar.Equipo"],
    Marca: ["create.asignar.Modelo"],
  };
  const accionesBase = ["create", "read", "update", "delete"];

  const modelNames = Object.keys(models).filter(
    (m) => ![].includes(m)
  );
  const allResources = [...modelNames, ...manualResources];

  for (const resource of allResources) {
    for (const accion of accionesBase) {
      const permKey = `${resource.toLowerCase()}.${accion}`;

      await models.Permiso.findOrCreate({
        where: { accion: permKey },
        defaults: {
          accion: permKey,
          descripcion: `Permiso para ${accion.toUpperCase()} en ${resource}`,
        },
      });
    }
    if (extraPermisos[resource]) {
      for (const extra of extraPermisos[resource]) {
        const permKey = `${resource.toLowerCase()}.${extra}`;
        await models.Permiso.findOrCreate({
          where: { accion: permKey },
          defaults: {
            accion: permKey,
            descripcion: `Permiso para ${extra.replace(/\./g, " ").toUpperCase()} en ${resource}`,
          },
        });
      }
    }
  }
};

const addAdmin = async () => {
  const [rolAdmin] = await models.Rol.findOrCreate({ where: { nombre: "ADMIN" } });

  const [adminUser] = await models.Usuario.findOrCreate({
    where: { username: process.env.ADMIN_USER },
    defaults: {
      username: process.env.ADMIN_USER,
      password: createHash(process.env.ADMIN_PASS),
      email: process.env.ADMIN_EMAIL,
      nombre: process.env.ADMIN_USER,
      apellido: "admin-User",
      dni: "00000000",
      rolId: rolAdmin.id,
      emailVerificado: true,
    },
  });

  devLogger.info(`✅ [USUARIO ADMIN] username: \x1b[32m[${process.env.ADMIN_USER}]\x1b[0m`);
  return adminUser;
};

const assignAllPermisosToAdmin = async (adminUser) => {
  if (!adminUser) return;

  const allPerms = await models.Permiso.findAll();
  await adminUser.setPermisos([]); // limpia todas las relaciones

  const CHUNK_SIZE = 50;
  for (let i = 0; i < allPerms.length; i += CHUNK_SIZE) {
    const chunk = allPerms.slice(i, i + CHUNK_SIZE);
    await adminUser.addPermisos(chunk);
  }
};

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
}
import GenericService from './helper/generic.service.js';
import { createHash } from '../../utils/bcrypt.js';
import { BadRequest, NotFound } from '../../config/error/errors.js';
import { verificarUsuarioTemplate } from '../../emails/templates/varificar.usuario.js';
import emailSenderService from '../../emails/helper/emailSender.service.js';
import services from '../../layers/services/servicesLoader.js';
import { sequelize } from '../../config/db/sequelize.config.js';

const CHUNK_SIZE = 50;
const CANT_HORAS_EXPIRATION_REGISTER = parseInt(process.env.CANT_HORAS_EXPIRATION_REGISTER) || 24;
const frontEndUrl = process.env.FRONTEND_ORIGIN;
const rolDefaultName = process.env.ROL_DEFAULT_NAME || "ADMINISTRATIVO";

export default class UsuarioService extends GenericService {
  constructor(dao) {
    super(dao);
  }

  async create(data) {
    const userData = { ...data };

    if (userData.password) {
      userData.password = createHash(userData.password);
    }

    if (!userData.rolId) {
      const [rolDefault] = await services.rolService.findOrCreate({
        where: { nombre: rolDefaultName },
      });
      userData.rolId = rolDefault.id;
    }

    const usuario = await this.dao.create(userData);
    await this.asignarPermisosPorRol(usuario);

    return usuario;
  }

  async update(id, data) {
    if (data.password) {
      data.password = createHash(data.password);
    }

    if (data.deletedAt) {
      data = { ...data, paranoid: false };
    }

    const oldRecord = await this.dao.findById(id, 'defaultScope');

    if (!oldRecord)
      throw new NotFound(`Usuario con ID ${id} no encontrado para actualizar`);

    return await this.dao.update(oldRecord, data);
  }

  async asignarPermisosPorRol(usuario) {
    if (!usuario) throw new NotFound("Usuario no definido o no encontrado");

    const rol = await usuario.getRolPrincipal();
    if (!rol) return;

    const existingPerms = await usuario.getPermisos();
    if (existingPerms.length > 0) return;

    const defaultPerms = rol.defaultPermisos || [];
    if (!defaultPerms.length) return;

    const allPerms = await services.permisoService.findAllPlain();
    let permisosAsignar = [];

    if (defaultPerms.includes("*")) {
      permisosAsignar = allPerms;
    } else {
      for (const entry of defaultPerms) {
        for (const action of entry.actions) {
          const key = `${entry.resource}.${action}`;
          const permiso = allPerms.find((p) => p.accion === key);
          if (permiso) permisosAsignar.push(permiso);
        }
      }
    }

    for (let i = 0; i < permisosAsignar.length; i += CHUNK_SIZE) {
      const chunk = permisosAsignar.slice(i, i + CHUNK_SIZE);
      await usuario.addPermisos(chunk);
    }
  };

  async generateVerificationToken(user) {
    if (!user) throw new NotFound("Usuario no definido o no encontrado");
    const token = createHash(user.email + Date.now().toString());
    const tokenExpiration = new Date(Date.now() + 1000 * 60 * 60 * CANT_HORAS_EXPIRATION_REGISTER);
    await user.update({ token, tokenExpiration });
    return user;
  }

  async sendVerificationEmail(user) {
    if (!user) throw new NotFound("Usuario no definido o no encontrado");
    if (!user.token) throw new BadRequest("El usuario no tiene un token de verificación");
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const nombreCompleto = `${capitalize(user.nombre)} ${capitalize(user.apellido)}`;
    const verificacionTemplate = verificarUsuarioTemplate({
      nombre: nombreCompleto,
      url: `${frontEndUrl}/verificar-email?token=${user.token}`
    });
    await emailSenderService.enviar(
      user.email,
      'Confirme su cuenta',
      '',
      verificacionTemplate,
      process.env.EMPRESA_NOMBRE
    );
  }

  async asignarOficina(idUsuario, idOficina) {
    const usuario = await this.dao.findById(idUsuario);
    if (!usuario) throw new NotFound(`Usuario con ID ${idUsuario} no encontrado`);
    const oficina = await services.oficinaService.findById(idOficina);
    if (!oficina) throw new NotFound(`Oficina con ID ${idOficina} no encontrada`);
    await usuario.setOficina(oficina);
    return usuario;
  }

  async desasignarOficina(idUsuario) {
    const usuario = await this.dao.findById(idUsuario);
    if (!usuario) throw new NotFound(`Usuario con ID ${idUsuario} no encontrado`);
    await usuario.setOficina(null);
    return usuario;
  }

  async agregarEquipoAsignado(idUsuario, idEquipo) {
    const t = await sequelize.transaction();
    try {
      const usuario = await this.dao.findById(idUsuario);
      if (!usuario) throw new NotFound(`Usuario con ID ${idUsuario} no encontrado`);
      const equipo = await services.equipoinformaticoService.findById(idEquipo);
      if (!equipo) throw new NotFound(`Equipo con ID ${idEquipo} no encontrado`);

      if (equipo.empleadoId || equipo.oficinaId) {
        throw new BadRequest(`El equipo ${idEquipo} ya está asignado.`);
      }
      if (equipo.disponibilidad !== 'disponible') {
        throw new BadRequest(`El equipo ${idEquipo} no está disponible (disponibilidad: ${equipo.disponibilidad}).`);
      } 

      await usuario.addEquiposAsignado(equipo, { transaction: t });
      await equipo.update({ estado: 'activo', disponibilidad: 'asignado' }, { transaction: t });

      await t.commit();
      return { usuario, equipo };
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  async desasignarEquipo(idUsuario, idEquipo) {
    const t = await sequelize.transaction();
    try {
      const usuario = await this.dao.findById(idUsuario);
      if (!usuario) throw new NotFound(`Usuario con ID ${idUsuario} no encontrado`);
      const equipo = await services.equipoinformaticoService.findById(idEquipo);
      if (!equipo) throw new NotFound(`Equipo con ID ${idEquipo} no encontrado`);

      await usuario.removeEquiposAsignado(equipo, { transaction: t });
      await equipo.update({ estado: 'activo', disponibilidad: 'disponible' }, { transaction: t });

      await t.commit();
      return { usuario, equipo };
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  async agregarEquiposAsignados(idUsuario, idsEquipos) {
    if (!idUsuario) {
      throw new BadRequest('Debe indicar un id de usuario');
    }
    if (!Array.isArray(idsEquipos)) {
      throw new BadRequest('los ids de equipos deben ser un array');
    }
    if (idsEquipos.length === 0) {
      throw new BadRequest('El array de equipos no puede estar vacío');
    }
    const usuario = await this.dao.findById(idUsuario);
    if (!usuario) throw new NotFound(`Usuario con ID ${idUsuario} no encontrado`);
    const equipos = await services.equipoinformaticoService.findAll({
      where: { id: idsEquipos }
    });
    const encontrados = equipos.map(u => u.id);
    const faltantes = idsEquipos.filter(id => !encontrados.includes(id));
    if (faltantes.length) {
      throw new NotFound(`Equipos no encontrados: ${faltantes.join(', ')}`);
    }
    await usuario.addEquiposAsignados(equipos);
    return usuario;
  }
}

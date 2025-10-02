import GenericService from './helper/generic.service.js';
import { models } from '../../config/db/sequelize.config.js';
import { createHash } from '../../utils/bcrypt.js';
import { BadRequest, NotFound } from '../../config/error/errors.js';
import { verificarUsuarioTemplate } from '../../emails/templates/varificar.usuario.js';
import emailSenderService from '../../emails/helper/emailSender.service.js';
import serviceInstances from '../../layers/services/servicesLoader.js';

const CHUNK_SIZE = 50;
const CANT_HORAS_EXPIRATION_REGISTER = parseInt(process.env.CANT_HORAS_EXPIRATION_REGISTER) || 24;
const frontEndUrl = process.env.FRONTEND_ORIGIN;

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
      const [rolDefault] = await serviceInstances.rolService.findOrCreate({
        where: { nombre: "ADMINISTRATIVO" },
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

    const allPerms = await models.Permiso.findAll();
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

}

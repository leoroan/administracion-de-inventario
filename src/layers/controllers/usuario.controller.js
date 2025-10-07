import GenericController from "./helper/generic.controller.js";
export default class UsuarioController extends GenericController {
  constructor(service) {
    super(service);
  }

  async verifyEmail(req, res, next) {
    try {
      const { token } = req.query;
      const user = await this.service.findOne({ where: { token } });
      if (user.tokenExpiration < new Date()) return res.sendSuccess("Token expirado");

      await user.update({
        emailVerificado: true,
        token: null,
        tokenExpiration: null,
      });

      res.sendSuccess("Email verificado correctamente");
    } catch (error) {
      next(error);
    }
  }

  async resendVerification(req, res, next) {
    try {
      const { email } = req.query;
      const user = await this.service.findOne({ where: { email } });
      if (!user) return res.sendSuccess("Usuario no encontrado");
      if (user.emailVerificado) return res.sendSuccess("Email ya verificado");
      const updatedUser = await this.service.generateVerificationToken(user);
      try {
        await this.service.sendVerificationEmail(updatedUser);
        return res.sendSuccess("Email de verificación reenviado");
      } catch (err) {
        return res.sendSuccess(`Error al enviar el email: ${err.message}`);
      }
    } catch (error) {
      next(error);
    }
  }

  async asignarOficina(req, res, next) {
    try {
      const { idUsuario, idOficina } = req.params;
      const result = await this.service.asignarOficina(idUsuario, idOficina);
      res.sendSuccess(result);
    } catch (error) {
      next(error);
    }
  }

  async desasignarOficina(req, res, next) {
    try {
      const { idUsuario } = req.params;
      const result = await this.service.desasignarOficina(idUsuario);
      res.sendSuccess(result);
    } catch (error) {
      next(error);
    }
  }

  async agregarEquipoAsignado(req, res, next) {
    try {
      const { idUsuario, idEquipo } = req.params;
      const result = await this.service.agregarEquipoAsignado(idUsuario, idEquipo);
      res.sendSuccess(result);
    } catch (error) {
      next(error);
    }
  }

  async desasignarEquipo(req, res, next) {
    try {
      const { idUsuario, idEquipo } = req.params;
      const result = await this.service.desasignarEquipo(idUsuario, idEquipo);
      res.sendSuccess(result);
    } catch (error) {
      next(error);
    }
  }

  async agregarEquiposAsignados(req, res, next) {
    try {
      const { idUsuario, idsEquipos } = req.body;
      const result = await this.service.agregarEquiposAsignados(idUsuario, idsEquipos);
      res.sendSuccess(result);
    } catch (error) {
      next(error);
    }
  }
}
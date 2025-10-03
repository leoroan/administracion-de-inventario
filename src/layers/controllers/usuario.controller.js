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
}
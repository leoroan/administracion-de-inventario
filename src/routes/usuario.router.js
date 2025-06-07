import passport from "passport";
import CustomRouter from "./custom/custom.router.js";
import services from "../layers/services/servicesLoader.js";
import UsuarioController from "../layers/controllers/usuario.controller.js";

export default class UsuarioExtendRouter extends CustomRouter {
  /**
   * api:/api/usuarios
   */
  constructor() {
    super();
    this.controller = new UsuarioController(services.usuarioService);
  }

  init() {
    super.init();

    this.get('/', ['PUBLIC'], async (req, res, next) => {
      this.controller.findAll(req, res, next);
    });

    this.get('/:id', ['ADMIN', 'DIRECTOR'], passport.authenticate('jwt'), async (req, res, next) => {
      this.controller.findById(req, res, next);
    });

    this.post('/', ['ADMIN', 'DIRECTOR'], passport.authenticate('jwt'), async (req, res, next) => {
      this.controller.create(req, res, next);
    });

    this.put('/:id', ['PUBLIC'], async (req, res, next) => {
      this.controller.update(req, res, next);
    });

    // this.put('/:id', ['ADMIN', 'DIRECTOR'], passport.authenticate('jwt'), async (req, res, next) => {
    //   this.controller.update(req, res, next);
    // });

    this.delete('/:id', ['ADMIN', 'DIRECTOR'], passport.authenticate('jwt'), async (req, res, next) => {
      this.controller.delete(req, res, next);
    });
  }
}

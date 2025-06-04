import passport from "passport";
import CustomRouter from "./custom/custom.router.js";
import services from "../layers/services/servicesLoader.js";
import RolController from "../layers/controllers/rol.controller.js";

export default class RolExtendRouter extends CustomRouter {
  /**
   * api:/api/roles
   */
  constructor() {
    super();
    this.controller = new RolController(services.rolService);
  }

  init() {
    super.init();

    this.get('/', ['PUBLIC'], async (req, res, next) => {
      this.controller.findAll(req, res, next);
    });

    this.get('/:id', ['PUBLIC'], async (req, res, next) => {
      this.controller.findById(req, res, next);
    });

    this.post('/', ['PUBLIC'], async (req, res, next) => {
      this.controller.create(req, res, next);
    });

    this.put('/:id', ['PUBLIC'], async (req, res, next) => {
      this.controller.update(req, res, next);
    });

    this.delete('/:id', ['PUBLIC'], async (req, res, next) => {
      this.controller.delete(req, res, next);
    });
  }
}

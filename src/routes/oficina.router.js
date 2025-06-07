import passport from "passport";
import CustomRouter from "./custom/custom.router.js";
import services from "../layers/services/servicesLoader.js";
import OficinaController from "../layers/controllers/oficina.controller.js";

export default class OficinaExtendRouter extends CustomRouter {
  /**
   * api:/api/oficinas
   */
  constructor() {
    super();
    this.controller = new OficinaController(services.oficinaService);
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

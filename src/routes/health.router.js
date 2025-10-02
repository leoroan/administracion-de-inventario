import passport from "passport";
import CustomRouter from "./custom/custom.router.js";
import healthController from "../layers/controllers/health.controller.js";

export default class HealthRouter extends CustomRouter {
  /**
   * api:/api/healths
   */
  constructor() {
    super();
    this.healthController = healthController;
  }

  init() {
    super.init();

    this.get('/como-estas', ["SERVICE_KEY"], async (req, res, next) => {  // en el front hay q agregar el headers: { "x-service-key": process.env.HEALTH_SERVICE_KEY }
    // this.get('/como-estas', ["health.read"], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.healthController.getStatus(req, res, next);
    });

  }
}


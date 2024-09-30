import CustomRouter from "../routes/custom/custom.router.js";
import TrazabilidadController from "../controllers/trazabilidad.controller.js";
import { trazabilidadService } from "../services/service.js";
import passport from "passport";

export default class TrazabilidadExtendRouter extends CustomRouter {
  /**
   * api:/api/trazabilidad
   */
  init() {

    const trazabilidadController = new TrazabilidadController(trazabilidadService);

    // this.post('/', [3], passport.authenticate('jwt'), async (req, res) => {
    //   trazabilidadController.create(req, res);
    // });

    // this.get('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
    //   trazabilidadController.findById(req, res);
    // });

    this.get('/', [3], passport.authenticate('jwt'), async (req, res) => {
      trazabilidadController.findAll(req, res);
    });

    // this.put('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
    //   trazabilidadController.update(req, res);
    // });

    // this.delete('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
    //   trazabilidadController.delete(req, res);
    // });

  }
}
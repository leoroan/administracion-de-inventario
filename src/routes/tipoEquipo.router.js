import CustomRouter from "../routes/custom/custom.router.js";
import TipoEquipoController from "../controllers/tipoEquipo.controller.js";
import { tipoEquipoService } from "../services/service.js";
import passport from "passport";

export default class TipoEquipoExtendRouter extends CustomRouter {
  /**
   * api:/api/tipoEquipos
   */
  init() {     // this.get('/:id', ['ADMIN', 'SUPERVISOR'], passport.authenticate('jwt'), async (req, res) => {

    const tipoEquipoController = new TipoEquipoController(tipoEquipoService);

    this.post('/', [3], passport.authenticate('jwt'), async (req, res) => {
      tipoEquipoController.create(req, res);
    });

    this.get('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      tipoEquipoController.findById(req, res);
    });

    this.get('/', [3], passport.authenticate('jwt'), async (req, res) => {
      tipoEquipoController.findAll(req, res);
    });

    this.put('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      tipoEquipoController.update(req, res);
    });

    this.delete('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      tipoEquipoController.delete(req, res);
    });

  }
}
import CustomRouter from "../routes/custom/custom.router.js";
import ModeloController from "../controllers/modelo.controller.js"; 
import { modeloService } from "../services/service.js";
import passport from "passport";

export default class ModeloExtendRouter extends CustomRouter {
  /**
   * api:/api/empleados
   */
  init() {     // this.get('/:id', ['ADMIN', 'SUPERVISOR'], passport.authenticate('jwt'), async (req, res) => {

    const modeloController = new ModeloController(modeloService);

    this.post('/', ['PUBLIC'], async (req, res) => {
      modeloController.create(req, res);
    });

    this.get('/:id', ['PUBLIC'], async (req, res) => {
      modeloController.findById(req, res);
    });

    this.get('/', ['PUBLIC'], async (req, res) => {
      modeloController.findAll(req, res);
    });

    this.put('/:id', ['PUBLIC'], async (req, res) => {
      modeloController.update(req, res);
    });

    this.delete('/:id', ['PUBLIC'], async (req, res) => {
      modeloController.delete(req, res);
    });

  }
}
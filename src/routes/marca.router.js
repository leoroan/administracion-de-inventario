import CustomRouter from "../routes/custom/custom.router.js";
import MarcaController from "../controllers/marca.controller.js"; 
import { marcaService } from "../services/service.js";
import passport from "passport";

export default class MarcaExtendRouter extends CustomRouter {
  /**
   * api:/api/empleados
   */
  init() {     // this.get('/:id', ['ADMIN', 'SUPERVISOR'], passport.authenticate('jwt'), async (req, res) => {

    const marcaController = new MarcaController(marcaService);

    this.post('/', ['PUBLIC'], async (req, res) => {
      marcaController.create(req, res);
    });

    this.get('/:id', ['PUBLIC'], async (req, res) => {
      marcaController.findById(req, res);
    });

    this.get('/', ['PUBLIC'], async (req, res) => {
      marcaController.findAll(req, res);
    });

    this.put('/:id', ['PUBLIC'], async (req, res) => {
      marcaController.update(req, res);
    });

    this.delete('/:id', ['PUBLIC'], async (req, res) => {
      marcaController.delete(req, res);
    });

  }
}
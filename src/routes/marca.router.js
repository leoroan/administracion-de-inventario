import CustomRouter from "../routes/custom/custom.router.js";
import MarcaController from "../controllers/marca.controller.js"; 
import { marcaService } from "../services/service.js";
import passport from "passport";

export default class MarcaExtendRouter extends CustomRouter {
  /**
   * api:/api/marcas
   */
  init() {     // this.get('/:id', ['ADMIN', 'SUPERVISOR'], passport.authenticate('jwt'), async (req, res) => {

    const marcaController = new MarcaController(marcaService);

    this.post('/', [3], passport.authenticate('jwt'), async (req, res) => {
      marcaController.create(req, res);
    });

    this.get('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      marcaController.findById(req, res);
    });

    this.get('/', [3], passport.authenticate('jwt'), async (req, res) => {
      marcaController.findAll(req, res);
    });

    this.put('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      marcaController.update(req, res);
    });

    this.delete('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      marcaController.delete(req, res);
    });

  }
}
import CustomRouter from "./custom/custom.router.js";
import EdificioController from "../controllers/edificio.controller.js";
import { edificioService } from "../services/service.js";
import passport from "passport";

export default class EdificioExtendRouter extends CustomRouter {
  /**
   * api:/api/edificios
   */
  init() {     // this.get('/:id', ['ADMIN', 'SUPERVISOR'], passport.authenticate('jwt'), async (req, res) => {

    const edificioController = new EdificioController(edificioService);

    this.post('/', [3], passport.authenticate('jwt'), async (req, res) => {
      edificioController.create(req, res);
    });

    this.get('/:id', [4], passport.authenticate('jwt'), async (req, res) => {
      edificioController.findById(req, res);
    });

    this.get('/', [4], passport.authenticate('jwt'), async (req, res) => {
      edificioController.findAll(req, res);
    });

    this.put('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      edificioController.update(req, res);
    });

    this.delete('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      edificioController.delete(req, res);
    });

  }
}
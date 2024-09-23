import CustomRouter from "../routes/custom/custom.router.js";
import EmpleadoController from "../controllers/empleado.controller.js";
import { empleadoService } from "../services/service.js";
import passport from "passport";

export default class EmpleadoExtendRouter extends CustomRouter {
  /**
   * api:/api/empleados
   */
  init() {     // this.get('/:id', ['ADMIN', 'SUPERVISOR'], passport.authenticate('jwt'), async (req, res) => {

    const empleadoController = new EmpleadoController(empleadoService);

    this.post('/', [3], async (req, res) => {
      empleadoController.create(req, res);
    });

    this.get('/:id', [3], async (req, res) => {
      empleadoController.findById(req, res);
    });

    this.get('/', [3], async (req, res) => {
      empleadoController.findAll(req, res);
    });

    this.put('/:id', [4], async (req, res) => {
      empleadoController.update(req, res);
    });

    this.delete('/:id', [3], async (req, res) => {
      empleadoController.delete(req, res);
    });

    this.get('/emailOrUsername/:some', [3], async (req, res) => {
      empleadoController.findByEmailORusername(req, res);
    });

    // TESTES
    this.get('/test/1', [1], passport.authenticate('jwt'), async (req, res) => {
      res.send('test role lvl 1 passed');
    });

    this.get('/test/4', [4], passport.authenticate('jwt'), async (req, res) => {
      res.send('test role lvl 4 passed');
    });

  }
}
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

    this.post('/', ['PUBLIC'], async (req, res) => {
      empleadoController.create(req, res);
    });

    this.get('/:id', ['PUBLIC'], async (req, res) => {
      empleadoController.findById(req, res);
    });

    this.get('/', ['PUBLIC'], async (req, res) => {
      empleadoController.findAll(req, res);
    });

    this.get('/test/1', [1], async (req, res) => {
      res.send('test role lvl 1 passed');
    });

    this.get('/test/4', [4], async (req, res) => {
      res.send('test role lvl 4 passed');
    });

    this.put('/:id', ['PUBLIC'], async (req, res) => {
      empleadoController.update(req, res);
    });

    this.delete('/:id', ['PUBLIC'], async (req, res) => {
      empleadoController.delete(req, res);
    });

    this.get('/emailOrUsername/:some', ['PUBLIC'], async (req, res) => {
      empleadoController.findByEmailORusername(req, res);
    });



  }
}
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

    this.post('/', [3], passport.authenticate('jwt'), async (req, res) => {
      empleadoController.create(req, res);
    });

    this.get('/:id', [6], passport.authenticate('jwt'), async (req, res) => {
      empleadoController.findById(req, res);
    });

    this.get('/', [5], passport.authenticate('jwt'), async (req, res) => {
      empleadoController.findAll(req, res);
    });

    this.put('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      empleadoController.update(req, res);
    });

    this.delete('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      empleadoController.delete(req, res);
    });

    this.get('/emailOrUsername/:some', [5], passport.authenticate('jwt'), async (req, res) => {
      empleadoController.findByEmailORusername(req, res);
    });

    this.post('/asignar/oficina', [3], passport.authenticate('jwt'), async (req, res) => {
      empleadoController.addOficina(req, res);
    });

    this.post('/remover/oficina', [3], passport.authenticate('jwt'), async (req, res) => {
      empleadoController.removeOficina(req, res);
    });

  }
}
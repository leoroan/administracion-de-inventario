import CustomRouter from "../routes/custom/custom.router.js";
import RegistroDeMantenimientoDeEquipoController from "../controllers/registroDeMantenimientoDeEquipo.controller.js";
import { registroDeMantenimientoDeEquipoService } from "../services/service.js";
import passport from "passport";

export default class registroDeMantenimientoExtendRouter extends CustomRouter {
  /**
   * api:/api/registrosDeMantenimiento
   */
  init() {     // this.get('/:id', ['ADMIN', 'SUPERVISOR'], passport.authenticate('jwt'), async (req, res) => {

    const registroDeMantenimientoController = new RegistroDeMantenimientoDeEquipoController(registroDeMantenimientoDeEquipoService);

    this.post('/', [4], passport.authenticate('jwt'), async (req, res) => {
      registroDeMantenimientoController.create(req, res);
    });

    this.get('/:id', [4], passport.authenticate('jwt'), async (req, res) => {
      registroDeMantenimientoController.findById(req, res);
    });

    this.get('/', [4], passport.authenticate('jwt'), async (req, res) => {
      registroDeMantenimientoController.findAll(req, res);
    });

    this.put('/:id', [4], passport.authenticate('jwt'), async (req, res) => {
      registroDeMantenimientoController.update(req, res);
    });

    this.delete('/:id', [4], passport.authenticate('jwt'), async (req, res) => {
      registroDeMantenimientoController.delete(req, res);
    });

    this.post('/agregar/registro', [3], passport.authenticate('jwt'), async (req, res) => {
      registroDeMantenimientoController.addRegistro(req, res);
    });

  }
}
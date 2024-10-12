import CustomRouter from "../routes/custom/custom.router.js";
import EquipoInformaticoController from "../controllers/equipoInformatico.controller.js";
import { equipoInformaticoService } from "../services/service.js";
import passport from "passport";
import { generarAsignacionEquipo } from "../controllers/pdf.controller.js";

export default class EquipoInformaticoExtendRouter extends CustomRouter {
  /**
   * api:/api/equipos
   */
  init() {     // this.get('/:id', ['ADMIN', 'SUPERVISOR'], passport.authenticate('jwt'), async (req, res) => {

    const equipoInformaticoController = new EquipoInformaticoController(equipoInformaticoService);

    this.post('/', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.create(req, res);
    });

    this.get('/:id', [6], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.findById(req, res);
    });

    this.get('/', [6], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.findAll(req, res);
    });

    this.put('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.update(req, res);
    });

    this.delete('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.delete(req, res);
    });

    this.post('/asignar/equipo', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.addEquipo(req, res);
    });

    this.post('/remover/equipo', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.removeEquipo(req, res);
    });

    this.post('/set/baja', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.setEstadoBaja(req, res);
    });

    this.get('/pdf/remito-entrega', [6], passport.authenticate('jwt'), async (req, res) => {
      generarAsignacionEquipo(req, res);
    });

  }
}
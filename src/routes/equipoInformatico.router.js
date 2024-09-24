import CustomRouter from "../routes/custom/custom.router.js";
import EquipoInformaticoController from "../controllers/equipoInformatico.controller.js";
import { equipoInformaticoService } from "../services/service.js";
import passport from "passport";

export default class EquipoInformaticoExtendRouter extends CustomRouter {
  /**
   * api:/api/equipos
   */
  init() {     // this.get('/:id', ['ADMIN', 'SUPERVISOR'], passport.authenticate('jwt'), async (req, res) => {

    const equipoInformaticoController = new EquipoInformaticoController(equipoInformaticoService);

    this.post('/', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.create(req, res);
    });

    this.get('/:id', [4], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.findById(req, res);
    });

    this.get('/', [4], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.findAll(req, res);
    });

    this.put('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.update(req, res);
    });

    this.delete('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.delete(req, res);
    });

    /**
     * QUERYs /asignar/equipo?uid=12345&eid=6789:
     */
    this.post('/asignar/equipo', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.addEquipo(req, res);
    });

    this.post('/remover/equipo', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.removeEquipo(req, res);
    });

    this.post('/set/baja', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.setEstadoBaja(req, res);
    });

  }
}
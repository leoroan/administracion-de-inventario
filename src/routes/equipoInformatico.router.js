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

    this.get('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.findById(req, res);
    });

    this.get('/', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.findAll(req, res);
    });

    this.put('/:id', [4], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.update(req, res);
    });

    this.delete('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.delete(req, res);
    });

    /**
     * make a POST request to http://localhost:3000/api/equipos/asignar/equipo?uid=12345&eid=6789:
     */
    this.post('/asignar/equipo/empleado', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.addEquipoToEmpleado(req, res);
    });

    this.post('/asignar/equipo/oficina', [3], passport.authenticate('jwt'), async (req, res) => {
      equipoInformaticoController.addEquipoToOficina(req, res);
    });

  }
}
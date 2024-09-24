import CustomRouter from "../routes/custom/custom.router.js";
import OficinaController from "../controllers/oficina.controller.js";
import { oficinaService } from "../services/service.js";
import passport from "passport";

export default class OficinaExtendRouter extends CustomRouter {
  /**
   * api:/api/oficinas
   */
  init() {     // this.get('/:id', ['ADMIN', 'SUPERVISOR'], passport.authenticate('jwt'), async (req, res) => {

    const oficinaController = new OficinaController(oficinaService);

    this.post('/', [3], passport.authenticate('jwt'), async (req, res) => {
      oficinaController.create(req, res);
    });

    this.get('/:id', [4], passport.authenticate('jwt'), async (req, res) => {
      oficinaController.findById(req, res);
    });

    this.get('/', [4], passport.authenticate('jwt'), async (req, res) => {
      oficinaController.findAll(req, res);
    });

    this.put('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      oficinaController.update(req, res);
    });

    this.delete('/:id', [3], passport.authenticate('jwt'), async (req, res) => {
      oficinaController.delete(req, res);
    });

    this.post('/asignar/oficina', [3], passport.authenticate('jwt'), async (req, res) => {
      oficinaController.addOficinaPadre(req, res);
    });

    this.post('/remover/oficina', [3], passport.authenticate('jwt'), async (req, res) => {
      oficinaController.removeOficinaPadre(req, res);
    });

    this.post('/asignar/edificio', [3], passport.authenticate('jwt'), async (req, res) => {
      oficinaController.addEdificio(req, res);
    });

    this.post('/remover/edificio', [3], passport.authenticate('jwt'), async (req, res) => {
      oficinaController.removeEdificio(req, res);
    });
  }
}
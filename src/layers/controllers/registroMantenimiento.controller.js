import GenericController from "./helper/generic.controller.js";

export default class RegistroMantenimientoController extends GenericController {
  constructor(service) {
    super(service);
  }

  async asignarEquipo(req, res, next) {
    try {
      const { registroId, equipoId } = req.params;
      const result = await this.service.asignarEquipo(registroId, equipoId);
      res.sendSuccess(result);
    } catch (err) {
      next(err);
    }
  }

  async crearRegistroConEquipo(req, res, next) {
    try {
      const { registroData, equipoId } = req.body;
      const result = await this.service.crearRegistroConEquipo(registroData, equipoId);
      res.sendSuccess(result);
    } catch (err) {
      next(err);
    }
  }

  async desasignarEquipo(req, res, next) {
    try {
      const { registroId } = req.params;
      const result = await this.service.desasignarEquipo(registroId);
      res.sendSuccess(result);
    } catch (err) {
      next(err);
    }
  }

}
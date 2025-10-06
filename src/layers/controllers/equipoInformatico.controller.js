import GenericController from "./helper/generic.controller.js";
export default class EquipoInformaticoController extends GenericController {
  constructor(service) {
    super(service);
  }

  async asignarOficina(req, res, next) {
    try {
      const { equipoId, oficinaId } = req.params;
      const result = await this.service.asignarOficina(equipoId, oficinaId);
      res.sendSuccess(result);
    } catch (error) {
      next(error);
    }
  }

  async agregarEmpleadoAsignado(req, res, next) {
    try {
      const { equipoId, empleadoId } = req.params;
      const result = await this.service.agregarEmpleadoAsignado(equipoId, empleadoId);
      res.sendSuccess(result);
    } catch (error) {
      next(error);
    }
  }

  async agregarRegistroMantenimiento(req, res, next) {
    try {
      const { equipoId } = req.params;
      const registroData = req.body;
      const result = await this.service.agregarRegistroMantenimiento(equipoId, registroData);
      res.sendSuccess(result);
    } catch (error) {
      next(error);
    }
  }

  async asignarTipoequipo(req, res, next) {
    try {
      const { equipoId, tipoId } = req.params;
      const result = await this.service.asignarTipoequipo(equipoId, tipoId);
      res.sendSuccess(result);
    } catch (error) {
      next(error);
    }
  }

  async asignarModelo(req, res, next) {
    try {
      const { equipoId, modeloId } = req.params;
      const result = await this.service.asignarModelo(equipoId, modeloId);
      res.sendSuccess(result);
    } catch (error) {
      next(error);
    }
  }
}
import GenericController from "./helper/generic.controller.js";
export default class TipoEquipoController extends GenericController {
  constructor(service) {
    super(service);
  }

  async asignarEquipo(req, res, next) {
    try {
      const { tipoEquipoId, equipoId } = req.params;
      const equipo = await this.service.asignarEquipo(tipoEquipoId, equipoId);
      res.sendSuccess(equipo);
    } catch (error) {
      next(error);
    }
  }

  async asignarEquipos(req, res, next) {
    try {
      const { tipoEquipoId, equiposIds } = req.body;
      const tipoEquipo = await this.service.asignarEquipos(tipoEquipoId, equiposIds);
      res.sendSuccess(tipoEquipo);
    } catch (error) {
      next(error);
    }
  }
}
import GenericController from "./helper/generic.controller.js";
export default class ModeloController extends GenericController {
  constructor(service) {
    super(service);
  }

  async agregarMarca(req, res, next) {
    try {
      const { modeloId, marcaId } = req.params;
      const modelo = await this.service.agregarMarca(modeloId, marcaId);
      res.sendSuccess(modelo);
    } catch (err) {
      next(err);
    }
  }

  async agregarEquipo(req, res, next) {
    try {
      const { modeloId, equipoId } = req.params;
      const modelo = await this.service.agregarEquipo(modeloId, equipoId);
      res.sendSuccess(modelo);
    } catch (err) {
      next(err);
    }
  }
}
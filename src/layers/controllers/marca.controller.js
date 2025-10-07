import GenericController from "./helper/generic.controller.js";
export default class MarcaController extends GenericController {
  constructor(service) {
    super(service);
  }

  async agregarModelo(req, res, next) {
    try {
      const { marcaId, modeloId } = req.params;
      const result = await this.service.agregarModelo(marcaId, modeloId);
      res.sendSuccess(result);
    } catch (err) {
      next(err);
    }
  }

  async removerModelo(req, res, next) {
    try {
      const { marcaId, modeloId } = req.params;
      const result = await this.service.removerModelo(marcaId, modeloId);
      res.sendSuccess(result);
    } catch (err) {
      next(err);
    }
  }

  async agregarModelos(req, res, next) {
    try {
      const { marcaId, idsModelos } = req.body;
      const result = await this.service.agregarModelos(marcaId, idsModelos);
      res.sendSuccess(result);
    } catch (err) {
      next(err);
    }
  }
}
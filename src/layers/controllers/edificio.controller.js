import GenericController from "./helper/generic.controller.js";
export default class EdificioController extends GenericController {
  constructor(service) {
    super(service);
  }

  async agregarOficina(req, res, next) {
    try {
      const { edificioId, oficinaId } = req.params;
      const result = await this.service.agregarOficina(edificioId, oficinaId);
      res.sendSuccess(result);
    } catch (error) {
      next(error);
    }
  }
}
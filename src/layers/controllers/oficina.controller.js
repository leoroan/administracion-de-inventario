import GenericController from "./helper/generic.controller.js";
export default class OficinaController extends GenericController {
  constructor(service) {
    super(service);
  }

  async agregarEmpleado(req, res, next) {
    try {
      const { idOficina, idEmpleado } = req.params;
      const usuario = await this.service.agregarEmpleado(idOficina, idEmpleado);
      res.sendSuccess(usuario);
    } catch (err) {
      next(err);
    }
  }

  async agregarEmpleados(req, res, next) {
    try {
      const { idOficina, idsEmpleados } = req.body;
      const usuarios = await this.service.agregarEmpleados(idOficina, idsEmpleados);
      res.sendSuccess(usuarios);
    } catch (err) {
      next(err);
    }
  }

  async agregarSubOficina(req, res, next) {
    try {
      const { idOficinaPadre, idOficinaHija } = req.params;
      const oficinaHija = await this.service.agregarSubOficina(idOficinaPadre, idOficinaHija);
      res.sendSuccess(oficinaHija);
    } catch (err) {
      next(err);
    }
  }

  async agregarOficinaPadre(req, res, next) {
    try {
      const { idOficinaHija, idOficinaPadre } = req.params;
      const oficinaPadre = await this.service.agregarOficinaPadre(idOficinaHija, idOficinaPadre);
      res.sendSuccess(oficinaPadre);
    } catch (err) {
      next(err);
    }
  }

  async asignarEdificio(req, res, next) {
    try {
      const { idOficina, idEdificio } = req.params;
      const oficina = await this.service.asignarEdificio(idOficina, idEdificio);
      res.sendSuccess(oficina);
    } catch (err) {
      next(err);
    }
  }

  async agregarEquipo(req, res, next) {
    try {
      const { idOficina, idEquipo } = req.params;
      const equipo = await this.service.agregarEquipo(idOficina, idEquipo);
      res.sendSuccess(equipo);
    } catch (err) {
      next(err);
    }
  }

  async agregarEquipos(req, res, next) {
    try {
      const { idOficina, idsEquipos } = req.body;
      const ids = Array.isArray(idsEquipos) ? idsEquipos : JSON.parse(idsEquipos);
      const equipos = await this.service.agregarEquipos(idOficina, ids);
      res.sendSuccess(equipos);
    } catch (err) {
      next(err);
    }
  }

}
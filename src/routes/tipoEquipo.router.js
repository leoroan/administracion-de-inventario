import CustomRouter from "./custom/custom.router.js";
import {
  crearTipoEquipo,
  obtenerTipoEquipos,
  obtenerTipoEquiposBorrados,
  obtenerTipoEquipo,
  obtenerTipoEquipoBorradoPorId,
  actualizarTipoEquipo,
  eliminarTipoEquipo,
  restaurarTipoEquipo
} from '../controllers/tipoEquipo.controller.js'

export default class TipoEquipoRouter extends CustomRouter {
  init() {
    this.post('/', ["PUBLIC"], async (req, res) => {
      crearTipoEquipo(req, res);
    });

    this.get('/:id', ["PUBLIC"], async (req, res) => {
      obtenerTipoEquipo(req, res);
    });

    this.get('/erased/:id', ["PUBLIC"], async (req, res) => {
      obtenerTipoEquipoBorradoPorId(req, res);
    });

    this.get('/', ["PUBLIC"], async (req, res) => {
      obtenerTipoEquipos(req, res);
    });

    this.get('/erased/all/types', ["PUBLIC"], async (req, res) => {
      obtenerTipoEquiposBorrados(req, res);
    });

    this.get('/restore/:id', ["PUBLIC"], async (req, res) => {
      restaurarTipoEquipo(req, res);
    });

    this.put('/:id', ["PUBLIC"], async (req, res) => {
      actualizarTipoEquipo(req, res);
    });

    this.delete('/:id', ["PUBLIC"], async (req, res) => {
      eliminarTipoEquipo(req, res);
    });

  }
}
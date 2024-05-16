import CustomRouter from "./custom/custom.router.js";
import {
  crearMantenimientoEquipo,
  obtenerMantenimientoEquipos,
  obtenerMantenimientoEquiposBorrados,
  obtenerMantenimientoEquipo,
  obtenerMantenimientoEquipoBorradoPorId,
  actualizarMantenimientoEquipo,
  eliminarMantenimientoEquipo,
  restaurarMantenimientoEquipo
} from '../controllers/MantenimientoEquipo.controller.js'

export default class MantenimientoDeEquipoRouter extends CustomRouter {
  init() {
    this.post('/', ["PUBLIC"], async (req, res) => {
      crearMantenimientoEquipo(req, res);
    });

    this.get('/:id', ["PUBLIC"], async (req, res) => {
      obtenerMantenimientoEquipo(req, res);
    });

    this.get('/erased/:id', ["PUBLIC"], async (req, res) => {
      obtenerMantenimientoEquipoBorradoPorId(req, res);
    });

    this.get('/', ["PUBLIC"], async (req, res) => {
      obtenerMantenimientoEquipos(req, res);
    });

    this.get('/erased/all/office', ["PUBLIC"], async (req, res) => {
      obtenerMantenimientoEquiposBorrados(req, res);
    });

    this.get('/restore/:id', ["PUBLIC"], async (req, res) => {
      restaurarMantenimientoEquipo(req, res);
    });

    this.put('/:id', ["PUBLIC"], async (req, res) => {
      actualizarMantenimientoEquipo(req, res);
    });

    this.delete('/:id', ["PUBLIC"], async (req, res) => {
      eliminarMantenimientoEquipo(req, res);
    });

  }
}
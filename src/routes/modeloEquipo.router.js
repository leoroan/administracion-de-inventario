import CustomRouter from "./custom/custom.router.js";
import {
  crearModeloEquipo,
  obtenerModeloEquipos,
  obtenerModeloEquiposBorrados,
  obtenerModeloEquipo,
  obtenerModeloEquipoBorradoPorId,
  actualizarModeloEquipo,
  eliminarModeloEquipo,
  restaurarModeloEquipo
} from '../controllers/modeloEquipo.controller.js'

export default class ModeloEquipoRouter extends CustomRouter {
  init() {
    this.post('/', ["PUBLIC"], async (req, res) => {
      crearModeloEquipo(req, res);
    });

    this.get('/:id', ["PUBLIC"], async (req, res) => {
      obtenerModeloEquipo(req, res);
    });

    this.get('/erased/:id', ["PUBLIC"], async (req, res) => {
      obtenerModeloEquipoBorradoPorId(req, res);
    });

    this.get('/', ["PUBLIC"], async (req, res) => {
      obtenerModeloEquipos(req, res);
    });

    this.get('/erased/all/brands', ["PUBLIC"], async (req, res) => {
      obtenerModeloEquiposBorrados(req, res);
    });

    this.get('/restore/:id', ["PUBLIC"], async (req, res) => {
      restaurarModeloEquipo(req, res);
    });

    this.put('/:id', ["PUBLIC"], async (req, res) => {
      actualizarModeloEquipo(req, res);
    });

    this.delete('/:id', ["PUBLIC"], async (req, res) => {
      eliminarModeloEquipo(req, res);
    });

  }
}
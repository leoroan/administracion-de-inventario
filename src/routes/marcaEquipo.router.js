import CustomRouter from "./custom/custom.router.js";
import {
  crearMarcaEquipo,
  obtenerMarcaEquipos,
  obtenerMarcaEquiposBorrados,
  obtenerMarcaEquipo,
  obtenerMarcaEquipoBorradoPorId,
  actualizarMarcaEquipo,
  eliminarMarcaEquipo,
  restaurarMarcaEquipo,
  agregarModeloAmarca
} from '../controllers/marcaEquipo.controller.js'

export default class MarcaEquipoRouter extends CustomRouter {
  init() {
    this.post('/', ["PUBLIC"], async (req, res) => {
      crearMarcaEquipo(req, res);
    });

    this.post('/M2B/:marcaId/:modeloId', ["PUBLIC"], async (req, res) => {
      agregarModeloAmarca(req, res);
    });

    this.get('/:id', ["PUBLIC"], async (req, res) => {
      obtenerMarcaEquipo(req, res);
    });

    this.get('/erased/:id', ["PUBLIC"], async (req, res) => {
      obtenerMarcaEquipoBorradoPorId(req, res);
    });

    this.get('/', ["PUBLIC"], async (req, res) => {
      obtenerMarcaEquipos(req, res);
    });

    this.get('/erased/all/brands', ["PUBLIC"], async (req, res) => {
      obtenerMarcaEquiposBorrados(req, res);
    });

    this.get('/restore/:id', ["PUBLIC"], async (req, res) => {
      restaurarMarcaEquipo(req, res);
    });

    this.put('/:id', ["PUBLIC"], async (req, res) => {
      actualizarMarcaEquipo(req, res);
    });

    this.delete('/:id', ["PUBLIC"], async (req, res) => {
      eliminarMarcaEquipo(req, res);
    });

  }
}
import CustomRouter from "./custom/custom.router.js";
import {
  crearEquipoInformatico,
  obtenerEquiposInformaticos,
  obtenerEquiposInformaticosBorrados,
  obtenerEquipoInformatico,
  obtenerEquipoInformaticoBorradoPorID,
  actualizarEquipoInformatico,
  eliminarEquipoInformatico,
  restaurarEquipoInformatico
} from "../controllers/equipoInformatico.controller.js";


export default class equiposInformaticosExtendRouter extends CustomRouter {
  init() {

    this.post('/', ["PUBLIC"], async (req, res) => {
      crearEquipoInformatico(req, res);
    });

    this.get('/:id', ["PUBLIC"], async (req, res) => {
      obtenerEquipoInformatico(req, res);
    });

    this.get('/erased/:id', ["PUBLIC"], async (req, res) => {
      obtenerEquipoInformaticoBorradoPorID(req, res);
    });

    this.get('/', ["PUBLIC"], async (req, res) => {
      obtenerEquiposInformaticos(req, res);
    });

    this.get('/erased/all/hardware', ["PUBLIC"], async (req, res) => {
      obtenerEquiposInformaticosBorrados(req, res);
    });

    this.get('/restore/:id', ["PUBLIC"], async (req, res) => {
      restaurarEquipoInformatico(req, res);
    });

    this.put('/:id', ["PUBLIC"], async (req, res) => {
      actualizarEquipoInformatico(req, res);
    });

    this.delete('/:id', ["PUBLIC"], async (req, res) => {
      eliminarEquipoInformatico(req, res);
    });

  }
}
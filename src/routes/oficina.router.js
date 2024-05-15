import CustomRouter from "./custom/custom.router";
import {
  crearOficina,
  obtenerOficinas,
  obtenerOficinasBorrados,
  obtenerOficina,
  obtenerOficinaBorradoPorId,
  actualizarOficina,
  eliminarOficina,
  restaurarOficina
} from '../controllers/oficina.controller.js'

export default class OficinaRouter extends CustomRouter {
  init() {
    this.post('/', ["PUBLIC"], async (req, res) => {
      crearOficina(req, res);
    });

    this.get('/:id', ["PUBLIC"], async (req, res) => {
      obtenerOficina(req, res);
    });

    this.get('/erased/:id', ["PUBLIC"], async (req, res) => {
      obtenerOficinaBorradoPorId(req, res);
    });

    this.get('/', ["PUBLIC"], async (req, res) => {
      obtenerOficinas(req, res);
    });

    this.get('/erased/all/office', ["PUBLIC"], async (req, res) => {
      obtenerOficinasBorrados(req, res);
    });

    this.get('/restore/:id', ["PUBLIC"], async (req, res) => {
      restaurarOficina(req, res);
    });

    this.put('/:id', ["PUBLIC"], async (req, res) => {
      actualizarOficina(req, res);
    });

    this.delete('/:id', ["PUBLIC"], async (req, res) => {
      eliminarOficina(req, res);
    });

  }
}
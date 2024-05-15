import CustomRouter from "./custom/custom.router";
import {
  crearLugar,
  obtenerlugares,
  obtenerlugaresBorrados,
  obtenerlugar,
  obtenerLugarBorradoPorId,
  actualizarlugar,
  eliminarlugar,
  restaurarlugar
} from '../controllers/lugar.controller.js'

export default class LugarRouter extends CustomRouter {
  init() {
    this.post('/', ["PUBLIC"], async (req, res) => {
      crearLugar(req, res);
    });

    this.get('/:id', ["PUBLIC"], async (req, res) => {
      obtenerlugar(req, res);
    });

    this.get('/erased/:id', ["PUBLIC"], async (req, res) => {
      obtenerLugarBorradoPorId(req, res);
    });

    this.get('/', ["PUBLIC"], async (req, res) => {
      obtenerlugares(req, res);
    });

    this.get('/erased/all/places', ["PUBLIC"], async (req, res) => {
      obtenerlugaresBorrados(req, res);
    });

    this.get('/restore/:id', ["PUBLIC"], async (req, res) => {
      restaurarlugar(req, res);
    });

    this.put('/:id', ["PUBLIC"], async (req, res) => {
      actualizarlugar(req, res);
    });

    this.delete('/:id', ["PUBLIC"], async (req, res) => {
      eliminarlugar(req, res);
    });

  }
}
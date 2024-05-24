import CustomRouter from "./custom/custom.router.js";
import {
  crearEmpleado,
  obtenerEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
  asignarEquipoAempleado,
  obtenerEmpleados,
  obtenerEmpleadoBorradoPorDni,
  obtenerEmpleadosBorrados,
  restaurarEmpleado,
  agregarEnBloque,
  removerEquipoAempleado,
  asignarOficinaAempleado,
  removerOficinaAempleado
} from '../controllers/empleado.controller.js';

export default class empleadoExtendRouter extends CustomRouter {
  init() {

    this.post('/', ["PUBLIC"], async (req, res) => {
      crearEmpleado(req, res);
    });

    this.post('/bulkCreate', ["PUBLIC"], async (req, res) => {
      agregarEnBloque(req, res);
    });

    this.post('/agregarEquipo/:empleadoId/:equipoId', ["PUBLIC"], async (req, res) => {
      asignarEquipoAempleado(req, res);
    });

    this.post('/removerEquipo/:empleadoId/:equipoId', ["PUBLIC"], async (req, res) => {
      removerEquipoAempleado(req, res);
    });

    this.post('/agregarOficina/:empleadoId/:oficinaId', ["PUBLIC"], async (req, res) => {
      asignarOficinaAempleado(req, res);
    });

    this.post('/removerOficina/:empleadoId/:oficinaId', ["PUBLIC"], async (req, res) => {
      removerOficinaAempleado(req, res);
    });

    this.get('/:id', ["PUBLIC"], async (req, res) => {
      obtenerEmpleado(req, res);
    });

    this.get('/erased/:dni', ["PUBLIC"], async (req, res) => {
      obtenerEmpleadoBorradoPorDni(req, res);
    });

    this.get('/', ["PUBLIC"], async (req, res) => {
      obtenerEmpleados(req, res);
    });

    this.get('/erased/all/employees', ["PUBLIC"], async (req, res) => {
      obtenerEmpleadosBorrados(req, res);
    });

    this.get('/restore/:id', ["PUBLIC"], async (req, res) => {
      restaurarEmpleado(req, res);
    });

    this.put('/:id', ["PUBLIC"], async (req, res) => {
      actualizarEmpleado(req, res);
    });

    this.delete('/:id', ["PUBLIC"], async (req, res) => {
      eliminarEmpleado(req, res);
    });

  }
}



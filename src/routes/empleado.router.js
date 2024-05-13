import CustomRouter from "./custom/custom.router.js";
import {
  crearEmpleado,
  obtenerEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
  asignarEquipoAempleado,
  obtenerEmpleados
} from '../controllers/empleado.controller.js';

export default class empleadoExtendRouter extends CustomRouter {
  init() {

    this.post('/', ["PUBLIC"], async (req, res) => {
      crearEmpleado(req, res);
    });

    this.post('/add/:empId/:eqId', ["PUBLIC"], async (req, res) => {
      asignarEquipoAempleado(req, res);
    });

    this.get('/:id', ["PUBLIC"], async (req, res) => {
      obtenerEmpleado(req, res);
    });

    this.get('/', ["PUBLIC"], async (req, res) => {
      obtenerEmpleados(req, res);
    });

    this.put('/:id', ["PUBLIC"], async (req, res) => {
      actualizarEmpleado(req, res);
    });
    
    this.delete('/:id', ["PUBLIC"], async (req, res) => {
      eliminarEmpleado(req, res);
    });
  }
}



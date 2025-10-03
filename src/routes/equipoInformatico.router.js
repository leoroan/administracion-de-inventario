import passport from "passport";
import CustomRouter from "./custom/custom.router.js";
import services from "../layers/services/servicesLoader.js";
import EquipoInformaticoController from "../layers/controllers/equipoInformatico.controller.js";

export default class EquipoInformaticoExtendRouter extends CustomRouter {
  /**
   * api:/api/EquipoInformaticos
   */
  constructor() {
    super();
    this.controller = new EquipoInformaticoController(services.equipoinformaticoService);
  }

  init() {
    super.init();

    // const service = getService('equipoinformaticoService');
    // this.controller = new EquipoInformaticoController(service);

    this.get('/', ['equipoinformatico.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Equipos Informaticos']
      // #swagger.path = '/EquipoInformaticos/' 
      // #swagger.summary = 'Obtiene todos los equipos informáticos'
      // #swagger.description = 'Obtiene una lista de todos los equipos informáticos registrados en el sistema.'
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */

      this.controller.findAll(req, res, next);
    });

    this.get('/:id', ['equipoinformatico.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Equipos Informaticos']
      // #swagger.path = '/EquipoInformaticos/{id}' 
      // #swagger.summary = 'Obtiene un equipo informático por ID'
      // #swagger.description = 'Obtiene los detalles de un equipo informático específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del equipo informático a obtener',
          required: true,
          type: 'string'
        } 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findById(req, res, next);
    });

    this.post('/nuevo', ['equipoinformatico.create'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.create(req, res, next);
    });

    this.put('/:id', ['equipoinformatico.update'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.update(req, res, next);
    });

    this.delete('/:id', ['equipoinformatico.delete'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Equipos Informaticos']
      // #swagger.path = '/EquipoInformaticos/{id}' 
      // #swagger.method = 'delete'
      // #swagger.summary = 'Borrar un equipo informático por ID'
      // #swagger.description = 'Borrar un equipo informático específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del equipo informático a borrar',
          required: true,
          type: 'string'
        } */
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.delete(req, res, next);
    });
  }
}

import passport from "passport";
import CustomRouter from "./custom/custom.router.js";
import services from "../layers/services/servicesLoader.js";
import TipoEquipoController from "../layers/controllers/tipoEquipo.controller.js";

export default class TipoEquipoExtendRouter extends CustomRouter {
  /**
   * api:/api/tipoEquipos
   */
  constructor() {
    super();
    this.controller = new TipoEquipoController(services.tipoequipoService);
  }

  init() {
    super.init();

    this.get('/', ['tipoEquipo.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Tipos de Equipo']
      // #swagger.path = '/tiposEquipos/' 
      // #swagger.summary = 'Obtiene todos los tipos de equipo'
      // #swagger.description = 'Obtiene una lista de todos los tipos de equipo registrados en el sistema.'
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findAll(req, res, next);
    });

    this.get('/:id', ['tipoEquipo.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Tipos de Equipo']
      // #swagger.path = '/tiposEquipos/{id}' 
      // #swagger.summary = 'Obtiene un tipo de equipo por ID'
      // #swagger.description = 'Obtiene los detalles de un tipo de equipo específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del tipo de equipo a obtener',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findById(req, res, next);
    });

    this.post('/nuevo', ['tipoEquipo.create'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.create(req, res, next);
    });

    this.put('/:id', ['tipoEquipo.update'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.update(req, res, next);
    });

    this.delete('/:id', ['tipoEquipo.delete'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Tipos de Equipo']
      // #swagger.path = '/tiposEquipos/{id}' 
      // #swagger.method = 'delete'
      // #swagger.summary = 'Borrar un tipo de equipo por ID'
      // #swagger.description = 'Borrar un tipo de equipo específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del tipo de equipo a borrar',
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

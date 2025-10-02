import passport from "passport";
import CustomRouter from "./custom/custom.router.js";
import services from "../layers/services/servicesLoader.js";
import OficinaController from "../layers/controllers/oficina.controller.js";

export default class OficinaExtendRouter extends CustomRouter {
  /**
   * api:/api/oficinas
   */
  constructor() {
    super();
    this.controller = new OficinaController(services.oficinaService);
  }

  init() {
    super.init();

    this.get('/', ['oficina.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/' 
      // #swagger.summary = 'Obtiene todos los oficinas'
      // #swagger.description = 'Obtiene una lista de todos los oficinas registrados en el sistema.'
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findAll(req, res, next);
    });

    this.get('/:id', ['oficina.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/{id}' 
      // #swagger.summary = 'Obtiene una oficina por ID'
      // #swagger.description = 'Obtiene los detalles de una oficina específica por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID de la oficina a obtener',
          required: true,
          type: 'string'
        } 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findById(req, res, next);
    });

    this.post('/nuevo', ['oficina.create'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.create(req, res, next);
    });

    this.put('/:id', ['oficina.update'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.update(req, res, next);
    });

    this.delete('/:id', ['oficina.delete'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/{id}' 
      // #swagger.method = 'delete'
      // #swagger.summary = 'Borrar una oficina por ID'
      // #swagger.description = 'Borrar una oficina específica por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID de la oficina a borrar',
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

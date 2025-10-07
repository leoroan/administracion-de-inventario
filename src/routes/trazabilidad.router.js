import passport from "passport";
import CustomRouter from "./custom/custom.router.js";
import TrazabilidadController from "../layers/controllers/trazabilidad.controller.js";
import services from "../layers/services/servicesLoader.js";

export default class TrazabilidadRouter extends CustomRouter {
  /**
   * api:/api/trazabilidads
   */
  constructor() {
    super();
    this.controller = new TrazabilidadController(services.trazabilidadService);
  }

  init() {
    super.init();

    this.get('/', ['trazabilidad.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Trazabilidad']
      // #swagger.path = '/trazabilidads/' 
      // #swagger.summary = 'Obtiene todos los registros de trazabilidad'
      // #swagger.description = 'Obtiene una lista de todos los registros de trazabilidad en el sistema.'
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findAll(req, res, next);
    });

    this.get('/:id', ['trazabilidad.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Trazabilidad']
      // #swagger.path = '/trazabilidads/{id}' 
      // #swagger.summary = 'Obtiene un registro de trazabilidad por ID'
      // #swagger.description = 'Obtiene los detalles de un registro de trazabilidad específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del registro de trazabilidad a obtener',
          required: true,
          type: 'string'
        } */
      /* #swagger.parameters['scope'] = { 
           in: 'query',
           description: 'Scope para ver diferentes vistas del usuario',
           required: false,
           type: 'string',
           enum: ['withPermisosScope', 'withRolScope']
         } */
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */

      this.controller.findById(req, res, next);
    });

    this.post('/nuevo', ['trazabilidad.create'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.create(req, res, next);
    });

    this.put('/restaurar/:id', ['trazabilidad.update.restore'], passport.authenticate('jwt'), async (req, res, next) => {
      /*
        #swagger.tags = ['Trazabilidad']
        #swagger.path = '/trazabilidads/restaurar/{id}'
        #swagger.method = 'put'
        #swagger.summary = 'Restaurar un registro de trazabilidad por ID'
        #swagger.description = 'Restaurar un registro de trazabilidad específico por su ID.'
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID del registro de trazabilidad a restaurar',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
          "bearerAuth": []
        }]
        */
      this.controller.restore(req, res, next);
    });

    this.put('/:id', ['trazabilidad.update'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.update(req, res, next);
    });

    this.delete('/:id', ['trazabilidad.delete'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Trazabilidad']
      // #swagger.path = '/trazabilidads/{id}' 
      // #swagger.method = 'delete'
      // #swagger.summary = 'Borrar un registro de trazabilidad por ID'
      // #swagger.description = 'Borrar un registro de trazabilidad específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del registro de trazabilidad a borrar',
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
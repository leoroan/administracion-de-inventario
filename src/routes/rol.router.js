import passport from "passport";
import CustomRouter from "./custom/custom.router.js";
import RolController from "../layers/controllers/rol.controller.js";
import services from "../layers/services/servicesLoader.js";

export default class RolExtendedRouter extends CustomRouter {
  /**
   * api:/api/rols
   */
  constructor() {
    super();
    this.controller = new RolController(services.rolService);
  }

  init() {
    super.init();

    this.get('/', ['rol.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Roles']
      // #swagger.path = '/rols/' 
      // #swagger.summary = 'Obtiene todos los roles'
      // #swagger.description = 'Obtiene una lista de todos los roles registrados en el sistema.'
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findAll(req, res, next);
    });

    this.get('/:id', ['rol.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Roles']
      // #swagger.path = '/rols/{id}' 
      // #swagger.summary = 'Obtiene un rol por ID'
      // #swagger.description = 'Obtiene los detalles de un rol específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del rol a obtener',
          required: true,
          type: 'string'
        } */
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */

      this.controller.findById(req, res, next);
    });

    this.post('/nuevo', ['rol.create'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.create(req, res, next);
    });

    this.put('/restaurar/:id', ['rol.update.restore'], passport.authenticate('jwt'), async (req, res, next) => {
      /*
        #swagger.tags = ['Roles']
        #swagger.path = '/rols/restaurar/{id}'
        #swagger.method = 'put'
        #swagger.summary = 'Restaurar un rol por ID'
        #swagger.description = 'Restaurar un rol específico por su ID.'
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID del rol a restaurar',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
          "bearerAuth": []
        }]
        */
      this.controller.restore(req, res, next);
    });

    this.put('/:id', ['rol.update'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.update(req, res, next);
    });

    this.delete('/:id', ['rol.delete'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Roles']
      // #swagger.path = '/rols/{id}' 
      // #swagger.method = 'delete'
      // #swagger.summary = 'Borrar un rol por ID'
      // #swagger.description = 'Borrar un rol específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del rol a borrar',
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

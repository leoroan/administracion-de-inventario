import passport from "passport";
import CustomRouter from "./custom/custom.router.js";
import PermisoController from "../layers/controllers/permiso.controller.js";
import services from "../layers/services/servicesLoader.js";

export default class PermisoExtendedRouter extends CustomRouter {
  /**
   * api:/api/permisos
   */
  constructor() {
    super();
    this.controller = new PermisoController(services.permisoService);
  }

  init() {
    super.init();

    this.get('/', ['permiso.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Permisos']
      // #swagger.path = '/permisos/' 
      // #swagger.summary = 'Obtiene todos los permisos'
      // #swagger.description = 'Obtiene una lista de todos los permisos registrados en el sistema.'
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findAll(req, res, next);
    });

    this.get('/:id', ['permiso.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Permisos']
      // #swagger.path = '/permisos/{id}' 
      // #swagger.summary = 'Obtiene un permiso por ID'
      // #swagger.description = 'Obtiene los detalles de un permiso específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del permiso a obtener',
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

    this.post('/nuevo', ['permiso.create'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.create(req, res, next);
    });

    this.put('/restaurar/:id', ['permiso.update.restore'], passport.authenticate('jwt'), async (req, res, next) => {
      /*
        #swagger.tags = ['Permisos']
        #swagger.path = '/permisos/restaurar/{id}'
        #swagger.method = 'put'
        #swagger.summary = 'Restaurar un permiso por ID'
        #swagger.description = 'Restaurar un permiso específico por su ID.'
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID del permiso a restaurar',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
          "bearerAuth": []
        }]
        */
      this.controller.restore(req, res, next);
    });

    this.put('/:id', ['permiso.update'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.update(req, res, next);
    });

    this.delete('/:id', ['permiso.delete'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Permisos']
      // #swagger.path = '/permisos/{id}' 
      // #swagger.method = 'delete'
      // #swagger.summary = 'Borrar un permiso por ID'
      // #swagger.description = 'Borrar un permiso específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del permiso a borrar',
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


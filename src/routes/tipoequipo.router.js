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

    this.get('/', ['tipoequipo.read'], passport.authenticate('jwt'), async (req, res, next) => {
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

    this.get('/:id', ['tipoequipo.read'], passport.authenticate('jwt'), async (req, res, next) => {
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

    this.post('/nuevo', ['tipoequipo.create'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.create(req, res, next);
    });

    this.put('/:id', ['tipoequipo.update'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.update(req, res, next);
    });

    this.delete('/:id', ['tipoequipo.delete'], passport.authenticate('jwt'), async (req, res, next) => {
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

    this.post('/:tipoEquipoId/asignarEquipo/:equipoId', ['tipoequipo.create.asignar.Equipo'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Tipos de Equipo']
      // #swagger.path = '/tiposEquipos/{tipoEquipoId}/asignarEquipo/{equipoId}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Asigna un equipo a un tipo de equipo'
      // #swagger.description = 'Asigna un equipo específico a un tipo de equipo usando sus IDs en la URL.'
      /* #swagger.parameters['tipoEquipoId'] = {
      in: 'path',
      description: 'ID del tipo de equipo al que se asignará el equipo',
      required: true,
      type: 'string'
       }
       #swagger.parameters['equipoId'] = {
      in: 'path',
      description: 'ID del equipo a asignar',
      required: true,
      type: 'string'
       }
       #swagger.security = [{
      "bearerAuth": []
       }]
      */
      this.controller.asignarEquipo(req, res, next);
    });

    this.post('/:tipoEquipoId/desAsignarEquipo/:equipoId', ['tipoequipo.create.desasignar.Equipo'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Tipos de Equipo']
      // #swagger.path = '/tiposEquipos/{tipoEquipoId}/desAsignarEquipo/{equipoId}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Desasigna un equipo de un tipo de equipo'
      // #swagger.description = 'Desasigna un equipo específico de un tipo de equipo usando sus IDs en la URL.'
      /* #swagger.parameters['tipoEquipoId'] = {
      in: 'path',
      description: 'ID del tipo de equipo al que se asignará el equipo',
      required: true,
      type: 'string'
       }
       #swagger.parameters['equipoId'] = {
      in: 'path',
      description: 'ID del equipo a asignar',
      required: true,
      type: 'string'
       }
       #swagger.security = [{
      "bearerAuth": []
       }]
      */
      this.controller.desasignarEquipo(req, res, next);
    });

    this.post('/asignarEquipos', ['tipoequipo.create.asignar.Equipo'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Tipos de Equipo']
      // #swagger.path = '/tiposEquipos/asignarEquipos'
      // #swagger.method = 'post'
      // #swagger.summary = 'Asigna varios equipos a un tipo de equipo'
      // #swagger.description = 'Asigna varios equipos a un tipo de equipo usando sus IDs enviados en el body.'
      /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'Objeto con idTipoEquipo y idsEquipos',
          required: true,
          schema: { idTipoEquipo: 'string', idsEquipos: ['string'] }
        }
      */
      // #swagger.security = [{
      //   "bearerAuth": []
      // }]
      this.controller.asignarEquipos(req, res, next);
    });
  }
}

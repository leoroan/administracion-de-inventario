import passport from "passport";
import CustomRouter from "./custom/custom.router.js";
import services from "../layers/services/servicesLoader.js";
import EdificioController from "../layers/controllers/edificio.controller.js";

export default class EdificioExtendRouter extends CustomRouter {
  /**
   * api:/api/edificios
   */
  constructor() {
    super();
    this.controller = new EdificioController(services.edificioService);
  }

  init() {
    super.init();

    this.get('/', ['edificio.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Edificios']
      // #swagger.path = '/edificios/' 
      // #swagger.summary = 'Obtiene todos los edificios'
      // #swagger.description = 'Obtiene una lista de todos los edificios registrados en el sistema.'
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findAll(req, res, next);
    });

    this.get('/:id', ['edificio.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Edificios']
      // #swagger.path = '/edificios/{id}' 
      // #swagger.summary = 'Obtiene un edificio por ID'
      // #swagger.description = 'Obtiene los detalles de un edificio específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del edificio a obtener',
          required: true,
          type: 'string'
        } 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findById(req, res, next);
    });

    this.post('/nuevo', ['edificio.create'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.create(req, res, next);
    });

    this.put('/:id', ['edificio.update'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.update(req, res, next);
    });

    this.delete('/:id', ['edificio.delete'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Edificios']
      // #swagger.path = '/edificios/{id}' 
      // #swagger.method = 'delete'
      // #swagger.summary = 'Borrar un edificio por ID'
      // #swagger.description = 'Borrar un edificio específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del edificio a borrar',
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

    this.post('/:edificioId/asignarOficina/:oficinaId', ['edificio.create.asignar.Oficina'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Edificios']
      // #swagger.path = '/edificios/{edificioId}/asignarOficina/{oficinaId}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Agregar una oficina a un edificio'
      // #swagger.description = 'Agrega una oficina existente a un edificio específico.'
      /* #swagger.parameters['edificioId'] = { 
          in: 'path',
          description: 'ID del edificio al que se agregará la oficina',
          required: true,
          type: 'string'
        } */
      /* #swagger.parameters['oficinaId'] = { 
          in: 'path',
          description: 'ID de la oficina a agregar',
          required: true,
          type: 'string'
        } */
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.agregarOficina(req, res, next);
    });

    this.post('/:edificioId/desasignarOficina/:oficinaId', ['edificio.create.desasignar.Oficina'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Edificios']
      // #swagger.path = '/edificios/{edificioId}/desasignarOficina/{oficinaId}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Desasigna una oficina de un edificio'
      // #swagger.description = 'Desasigna una oficina existente de un edificio específico.'
      /* #swagger.parameters['edificioId'] = { 
          in: 'path',
          description: 'ID del edificio al que se desasignará la oficina',
          required: true,
          type: 'string'
        } */
      /* #swagger.parameters['oficinaId'] = { 
          in: 'path',
          description: 'ID de la oficina a agregar',
          required: true,
          type: 'string'
        } */
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.agregarOficina(req, res, next);
    });
  }
}

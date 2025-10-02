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
  }
}

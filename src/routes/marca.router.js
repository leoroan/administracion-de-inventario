import passport from "passport";
import CustomRouter from "./custom/custom.router.js";
import services from "../layers/services/servicesLoader.js";
import MarcaController from "../layers/controllers/marca.controller.js";

export default class MarcaExtendRouter extends CustomRouter {
  /**
   * api:/api/Marcas
   */
  constructor() {
    super();
    this.controller = new MarcaController(services.marcaService);
  }

  init() {
    super.init();

    this.get('/', ['marca.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Marcas']
      // #swagger.path = '/marcas/' 
      // #swagger.summary = 'Obtiene todos los marcas'
      // #swagger.description = 'Obtiene una lista de todos los marcas registrados en el sistema.'
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findAll(req, res, next);
    });

    this.get('/:id', ['marca.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Marcas']
      // #swagger.path = '/marcas/{id}' 
      // #swagger.summary = 'Obtiene un marca por ID'
      // #swagger.description = 'Obtiene los detalles de un marca específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del marca a obtener',
          required: true,
          type: 'string'
        } 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findById(req, res, next);
    });

    this.post('/nuevo', ['marca.create'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.create(req, res, next);
    });

    this.put('/:id', ['marca.update'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.update(req, res, next);
    });

    this.delete('/:id', ['marca.delete'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Marcas']
      // #swagger.path = '/marcas/{id}' 
      // #swagger.method = 'delete'
      // #swagger.summary = 'Borrar un marca por ID'
      // #swagger.description = 'Borrar un marca específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del marca a borrar',
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

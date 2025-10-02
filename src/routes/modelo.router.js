import passport from "passport";
import CustomRouter from "./custom/custom.router.js";
import services from "../layers/services/servicesLoader.js";
import ModeloController from "../layers/controllers/modelo.controller.js";

export default class ModeloExtendRouter extends CustomRouter {
  /**
   * api:/api/Modelos
   */
  constructor() {
    super();
    this.controller = new ModeloController(services.modeloService);
  }

  init() {
    super.init();

    this.get('/', ['modelo.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Modelos']
      // #swagger.path = '/modelos/' 
      // #swagger.summary = 'Obtiene todos los modelos'
      // #swagger.description = 'Obtiene una lista de todos los modelos registrados en el sistema.'
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findAll(req, res, next);
    });

    this.get('/:id', ['modelo.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Modelos']
      // #swagger.path = '/modelos/{id}' 
      // #swagger.summary = 'Obtiene un modelo por ID'
      // #swagger.description = 'Obtiene los detalles de un modelo específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del modelo a obtener',
          required: true,
          type: 'string'
        } 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findById(req, res, next);
    });

    this.post('/nuevo', ['modelo.create'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.create(req, res, next);
    });

    this.put('/:id', ['modelo.update'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.update(req, res, next);
    });

    this.delete('/:id', ['modelo.delete'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Modelos']
      // #swagger.path = '/modelos/{id}' 
      // #swagger.method = 'delete'
      // #swagger.summary = 'Borrar un modelo por ID'
      // #swagger.description = 'Borrar un modelo específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del modelo a borrar',
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
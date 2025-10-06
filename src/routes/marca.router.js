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

    this.post('/:marcaId/asignarModelo/:modeloId', ['marca.create.asignar.Modelo'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Marcas']
      // #swagger.path = '/marcas/{marcaId}/asignarModelo/{modeloId}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Agregar un modelo a una marca'
      // #swagger.description = 'Agrega un modelo específico a una marca usando sus IDs.'
      /* #swagger.parameters['marcaId'] = { 
        in: 'path',
        description: 'ID de la marca',
        required: true,
        type: 'string'
       }
       #swagger.parameters['modeloId'] = { 
        in: 'path',
        description: 'ID del modelo a agregar',
        required: true,
        type: 'string'
       }
       #swagger.security = [{
        "bearerAuth": []
       }]
      */
      this.controller.agregarModelo(req, res, next);
    });

    this.post('/agregar-modelos', ['marca.create.asignar.Modelo'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Marcas']
      // #swagger.path = '/marcas/agregar-modelos'
      // #swagger.method = 'post'
      // #swagger.summary = 'Agregar varios modelos a una marca'
      // #swagger.description = 'Agrega varios modelos a una marca usando un array de IDs de modelos.'
      /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'Objeto con idOficina y idsEquipos',
          required: true,
          schema: { idOficina: 'string', idsEquipos: ['string'] }
        }
        #swagger.security = [{
        "bearerAuth": []
        }] 
      */
      this.controller.agregarModelos(req, res, next);
    });
  }
}

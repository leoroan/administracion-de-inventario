import passport from "passport";
import CustomRouter from "./custom/custom.router.js";
import services from "../layers/services/servicesLoader.js";
import UsuarioController from "../layers/controllers/usuario.controller.js";

export default class UsuarioExtendRouter extends CustomRouter {
  /**
   * api:/api/usuarios
   */
  constructor() {
    super();
    this.controller = new UsuarioController(services.usuarioService);
  }

  init() {
    super.init();

    this.get('/', ['usuario.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Usuarios']
      // #swagger.path = '/usuarios/' 
      // #swagger.summary = 'Obtiene todos los usuarios'
      // #swagger.description = 'Obtiene una lista de todos los usuarios registrados en el sistema.'
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findAll(req, res, next);
    });

    this.get('/:id', ['usuario.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Usuarios']
      // #swagger.path = '/usuarios/{id}' 
      // #swagger.summary = 'Obtiene un usuario por ID'
      // #swagger.description = 'Obtiene los detalles de un usuario específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del usuario a obtener',
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

    this.post('/nuevo', ['usuario.create'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.create(req, res, next);
    });

    this.put('/restaurar/:id', ['usuario.update.restore'], passport.authenticate('jwt'), async (req, res, next) => {
      /*
        #swagger.tags = ['Usuarios']
        #swagger.path = '/usuarios/restaurar/{id}'
        #swagger.method = 'put'
        #swagger.summary = 'Restaurar un usuario por ID'
        #swagger.description = 'Restaurar un usuario específico por su ID.'
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID del usuario a restaurar',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
          "bearerAuth": []
        }]
        */
      this.controller.restore(req, res, next);
    });

    this.put('/:id', ['usuario.update'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.update(req, res, next);
    });

    this.delete('/:id', ['usuario.delete'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Usuarios']
      // #swagger.path = '/usuarios/{id}' 
      // #swagger.method = 'delete'
      // #swagger.summary = 'Borrar un usuario por ID'
      // #swagger.description = 'Borrar un usuario específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del usuario a borrar',
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

    this.post('/verificar-email', [], async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.verifyEmail(req, res, next);
    });

    this.post('/reenviar-verificacion', [], async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.resendVerification(req, res, next);
    });
  }
}

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

    this.post('/:idUsuario/asignar-oficina/:idOficina', ['usuario.create.oficina'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Usuarios']
      // #swagger.path = '/usuarios/{idUsuario}/asignar-oficina/{idOficina}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Asigna una oficina a un usuario'
      // #swagger.description = 'Asigna una oficina específica a un usuario usando los IDs en la URL.'
      /* #swagger.parameters['idUsuario'] = {
        in: 'path',
        description: 'ID del usuario',
        required: true,
        type: 'string'
      } */
      /* #swagger.parameters['idOficina'] = {
        in: 'path',
        description: 'ID de la oficina',
        required: true,
        type: 'string'
      } */
      /* 
      #swagger.security = [{
      "bearerAuth": []
      }] 
      */
      this.controller.asignarOficina(req, res, next);
    });

    this.post('/:idUsuario/agregar-equipo/:idEquipo', ['usuario.create.equipo'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Usuarios']
      // #swagger.path = '/usuarios/{idUsuario}/agregar-equipo/{idEquipo}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Agrega un equipo a un usuario'
      // #swagger.description = 'Agrega un equipo específico a la lista de equipos asignados de un usuario.'
      /* #swagger.parameters['idUsuario'] = {
        in: 'path',
        description: 'ID del usuario',
        required: true,
        type: 'string'
      } */
      /* #swagger.parameters['idEquipo'] = {
        in: 'path',
        description: 'ID del equipo',
        required: true,
        type: 'string'
      } */
      /* 
      #swagger.security = [{
        "bearerAuth": []
      }] 
      */
      this.controller.agregarEquipoAsignado(req, res, next);
    }
    );

    this.post('/agregar-equipos', ['usuario.create.equipo'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Usuarios']
      // #swagger.path = '/usuarios/agregar-equipos'
      // #swagger.method = 'post'
      // #swagger.summary = 'Agrega varios equipos a un usuario'
      // #swagger.description = 'Agrega varios equipos a la lista de equipos asignados de un usuario.'
      /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'Objeto con idUsuario y idsEquipos',
          required: true,
          schema: { idUsuario: 'string', idsEquipos: ['string'] }
        }
        #swagger.security = [{
        "bearerAuth": []
        }] 
      */
      this.controller.agregarEquiposAsignados(req, res, next);
    });
  }
}

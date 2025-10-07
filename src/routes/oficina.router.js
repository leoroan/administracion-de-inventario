import passport from "passport";
import CustomRouter from "./custom/custom.router.js";
import services from "../layers/services/servicesLoader.js";
import OficinaController from "../layers/controllers/oficina.controller.js";

export default class OficinaExtendRouter extends CustomRouter {
  /**
   * api:/api/oficinas
   */
  constructor() {
    super();
    this.controller = new OficinaController(services.oficinaService);
  }

  init() {
    super.init();

    this.get('/', ['oficina.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/' 
      // #swagger.summary = 'Obtiene todos los oficinas'
      // #swagger.description = 'Obtiene una lista de todos los oficinas registrados en el sistema.'
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findAll(req, res, next);
    });

    this.get('/:id', ['oficina.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/{id}' 
      // #swagger.summary = 'Obtiene una oficina por ID'
      // #swagger.description = 'Obtiene los detalles de una oficina específica por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID de la oficina a obtener',
          required: true,
          type: 'string'
        } 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findById(req, res, next);
    });

    this.post('/nuevo', ['oficina.create'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.create(req, res, next);
    });

    this.put('/:id', ['oficina.update'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.update(req, res, next);
    });

    this.delete('/:id', ['oficina.delete'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/{id}' 
      // #swagger.method = 'delete'
      // #swagger.summary = 'Borrar una oficina por ID'
      // #swagger.description = 'Borrar una oficina específica por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID de la oficina a borrar',
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

    this.post('/:idOficina/empleado/:idEmpleado', ['oficina.create.asignar.Empleado'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/{idOficina}/empleado/{idEmpleado}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Agregar un empleado a una oficina'
      // #swagger.description = 'Agrega un empleado específico a una oficina.'
      /* #swagger.parameters['idOficina'] = { 
          in: 'path',
          description: 'ID de la oficina',
          required: true,
          type: 'string'
        }
        #swagger.parameters['idEmpleado'] = { 
          in: 'path',
          description: 'ID del empleado a agregar',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.agregarEmpleado(req, res, next);
    });

    this.post('/:idOficina/removerEmpleado/:idEmpleado', ['oficina.create.desasignar.Empleado'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/{idOficina}/removerEmpleado/{idEmpleado}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Remover un empleado de una oficina'
      // #swagger.description = 'Remueve un empleado específico de una oficina.'
      /* #swagger.parameters['idOficina'] = { 
          in: 'path',
          description: 'ID de la oficina',
          required: true,
          type: 'string'
        }
        #swagger.parameters['idEmpleado'] = { 
          in: 'path',
          description: 'ID del empleado a agregar',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.removerEmpleado(req, res, next);
    });

    this.post('/empleados', ['oficina.create.asignar.Empleado'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/empleados'
      // #swagger.method = 'post'
      // #swagger.summary = 'Agregar múltiples empleados a una oficina'
      // #swagger.description = 'Agrega varios empleados a una oficina.'
      /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'Objeto con idOficina y idsEmpleados',
          required: true,
          schema: { idOficina: 'string', idsEmpleados: ['string'] }
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.agregarEmpleados(req, res, next);
    });

    this.post('/:idOficinaPadre/agregarSuboficina/:idOficinaHija', ['oficina.create.asignar.Oficina'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/{idOficinaPadre}/agregarSuboficina/{idOficinaHija}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Agregar una suboficina a una oficina'
      // #swagger.description = 'Agrega una suboficina a una oficina padre.'
      /* #swagger.parameters['idOficinaPadre'] = { 
          in: 'path',
          description: 'ID de la oficina padre',
          required: true,
          type: 'string'
        }
        #swagger.parameters['idOficinaHija'] = { 
          in: 'path',
          description: 'ID de la oficina hija',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.agregarSubOficina(req, res, next);
    });

    this.post('/:idOficinaPadre/removerSuboficina/:idOficinaHija', ['oficina.create.desasignar.Oficina'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/{idOficinaPadre}/removerSuboficina/{idOficinaHija}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Remover una suboficina de una oficina'
      // #swagger.description = 'Remueve una suboficina de una oficina padre.'
      /* #swagger.parameters['idOficinaPadre'] = { 
          in: 'path',
          description: 'ID de la oficina padre',
          required: true,
          type: 'string'
        }
        #swagger.parameters['idOficinaHija'] = { 
          in: 'path',
          description: 'ID de la oficina hija',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.removerSubOficina(req, res, next);
    });

    this.post('/:idOficinaHija/agregarOficinaPadre/:idOficinaPadre', ['oficina.create.asignar.Oficina'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/{idOficinaHija}/agregarOficinaPadre/{idOficinaPadre}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Agregar una oficina padre a una oficina hija'
      // #swagger.description = 'Asigna una oficina padre a una oficina hija.'
      /* #swagger.parameters['idOficinaHija'] = { 
          in: 'path',
          description: 'ID de la oficina hija',
          required: true,
          type: 'string'
        }
        #swagger.parameters['idOficinaPadre'] = { 
          in: 'path',
          description: 'ID de la oficina padre',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.agregarOficinaPadre(req, res, next);
    });

    this.post('/:idOficinaHija/removerOficinaPadre', ['oficina.create.desasignar.Oficina'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/{idOficinaHija}/removerOficinaPadre'
      // #swagger.method = 'post'
      // #swagger.summary = 'Remover una oficina padre de una oficina hija'
      // #swagger.description = 'Remueve una oficina padre de una oficina hija.'
      /* #swagger.parameters['idOficinaHija'] = { 
          in: 'path',
          description: 'ID de la oficina hija',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.removerOficinaPadre(req, res, next);
    });

    this.post('/:idOficina/asignarEdificio/:idEdificio', ['oficina.create.asignar.Edificio'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/{idOficina}/asignarEdificio/{idEdificio}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Asignar un edificio a una oficina'
      // #swagger.description = 'Asigna un edificio a una oficina.'
      /* #swagger.parameters['idOficina'] = { 
          in: 'path',
          description: 'ID de la oficina',
          required: true,
          type: 'string'
        }
        #swagger.parameters['idEdificio'] = { 
          in: 'path',
          description: 'ID del edificio',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.asignarEdificio(req, res, next);
    });

    this.post('/:idOficina/removerEdificio', ['oficina.create.desasignar.Edificio'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/{idOficina}/removerEdificio/{idEdificio}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Remover un edificio de una oficina'
      // #swagger.description = 'Remueve un edificio de una oficina.'
      /* #swagger.parameters['idOficina'] = { 
          in: 'path',
          description: 'ID de la oficina',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.removerEdificio(req, res, next);
    });

    this.post('/:idOficina/asignarEquipo/:idEquipo', ['oficina.create.asignar.Equipo'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/{idOficina}/asignarEquipo/{idEquipo}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Agregar un equipo a una oficina'
      // #swagger.description = 'Agrega un equipo específico a una oficina.'
      /* #swagger.parameters['idOficina'] = { 
          in: 'path',
          description: 'ID de la oficina',
          required: true,
          type: 'string'
        }
        #swagger.parameters['idEquipo'] = { 
          in: 'path',
          description: 'ID del equipo a agregar',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.agregarEquipo(req, res, next);
    });

    this.post('/:idOficina/removerEquipo/:idEquipo', ['oficina.create.desasignar.Equipo'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/{idOficina}/removerEquipo/{idEquipo}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Remover un equipo de una oficina'
      // #swagger.description = 'Remueve un equipo específico de una oficina.'
      /* #swagger.parameters['idOficina'] = { 
          in: 'path',
          description: 'ID de la oficina',
          required: true,
          type: 'string'
        }
        #swagger.parameters['idEquipo'] = { 
          in: 'path',
          description: 'ID del equipo a agregar',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.removerEquipo(req, res, next);
    });

    this.post('/asignarEquipos', ['oficina.create.asignar.Equipos'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/asignarEquipos'
      // #swagger.method = 'post'
      // #swagger.summary = 'Agregar múltiples equipos a una oficina'
      // #swagger.description = 'Agrega varios equipos a una oficina.'
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
      this.controller.agregarEquipos(req, res, next);
    });

    this.post('/:idOficina/removerEquipos', ['oficina.create.desasignar.Equipo'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Oficinas']
      // #swagger.path = '/oficinas/{idOficina}/removerEquipos'
      // #swagger.method = 'post'
      // #swagger.summary = 'Remover múltiples equipos de una oficina'
      // #swagger.description = 'Remueve varios equipos de una oficina.'
      /* #swagger.parameters['body'] = {
          in: 'path',
          description: 'ID de la oficina',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.removerEquipos(req, res, next);
    });
  }
}

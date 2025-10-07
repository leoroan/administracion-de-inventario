import passport from "passport";
import CustomRouter from "./custom/custom.router.js";
import services from "../layers/services/servicesLoader.js";
import EquipoInformaticoController from "../layers/controllers/equipoInformatico.controller.js";

export default class EquipoInformaticoExtendRouter extends CustomRouter {
  /**
   * api:/api/EquipoInformaticos
   */
  constructor() {
    super();
    this.controller = new EquipoInformaticoController(services.equipoinformaticoService);
  }

  init() {
    super.init();

    // const service = getService('equipoinformaticoService');
    // this.controller = new EquipoInformaticoController(service);

    this.get('/', ['equipoinformatico.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Equipos Informaticos']
      // #swagger.path = '/EquipoInformaticos/' 
      // #swagger.summary = 'Obtiene todos los equipos informáticos'
      // #swagger.description = 'Obtiene una lista de todos los equipos informáticos registrados en el sistema.'
      /* 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */

      this.controller.findAll(req, res, next);
    });

    this.get('/:id', ['equipoinformatico.read'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Equipos Informaticos']
      // #swagger.path = '/EquipoInformaticos/{id}' 
      // #swagger.summary = 'Obtiene un equipo informático por ID'
      // #swagger.description = 'Obtiene los detalles de un equipo informático específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del equipo informático a obtener',
          required: true,
          type: 'string'
        } 
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.findById(req, res, next);
    });

    this.post('/nuevo', ['equipoinformatico.create'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.create(req, res, next);
    });

    this.put('/:id', ['equipoinformatico.update'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.ignore = true
      this.controller.update(req, res, next);
    });

    this.delete('/:id', ['equipoinformatico.delete'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Equipos Informaticos']
      // #swagger.path = '/EquipoInformaticos/{id}' 
      // #swagger.method = 'delete'
      // #swagger.summary = 'Borrar un equipo informático por ID'
      // #swagger.description = 'Borrar un equipo informático específico por su ID.'
      /* #swagger.parameters['id'] = { 
          in: 'path',
          description: 'ID del equipo informático a borrar',
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

    this.post('/:equipoId/asignarOficina/:oficinaId', ['equipoinformatico.create.asignar.Oficina'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Equipos Informaticos']
      // #swagger.path = '/EquipoInformaticos/{equipoId}/oficina/{oficinaId}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Asigna una oficina a un equipo informático'
      // #swagger.description = 'Asigna una oficina específica a un equipo informático.'
      /* #swagger.parameters['equipoId'] = { 
          in: 'path',
          description: 'ID del equipo informático',
          required: true,
          type: 'string'
        }
        #swagger.parameters['oficinaId'] = { 
          in: 'path',
          description: 'ID de la oficina a asignar',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.asignarOficina(req, res, next);
    });

    this.post('/:equipoId/desAsignarOficina', ['equipoinformatico.create.desasignar.Oficina'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Equipos Informaticos']
      // #swagger.path = '/EquipoInformaticos/{equipoId}/oficina/{oficinaId}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Desasigna una oficina de un equipo informático'
      // #swagger.description = 'Desasigna una oficina específica de un equipo informático.'
      /* #swagger.parameters['equipoId'] = { 
          in: 'path',
          description: 'ID del equipo informático',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.removerOficina(req, res, next);
    });

    this.post('/:equipoId/asignarEmpleado/:empleadoId', ['equipoinformatico.create.asignar.Usuario'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Equipos Informaticos']
      // #swagger.path = '/EquipoInformaticos/{equipoId}/asignarEmpleado/{empleadoId}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Agrega un empleado a un equipo informático'
      // #swagger.description = 'Agrega un empleado asignado a un equipo informático.'
      /* #swagger.parameters['equipoId'] = { 
          in: 'path',
          description: 'ID del equipo informático',
          required: true,
          type: 'string'
        }
        #swagger.parameters['empleadoId'] = { 
          in: 'path',
          description: 'ID del empleado a asignar',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.agregarEmpleadoAsignado(req, res, next);
    });

    this.post('/:equipoId/desAsignarEmpleado', ['equipoinformatico.create.desasignar.Usuario'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Equipos Informaticos']
      // #swagger.path = '/EquipoInformaticos/{equipoId}/desAsignarEmpleado'
      // #swagger.method = 'post'
      // #swagger.summary = 'Desasigna un empleado de un equipo informático'
      // #swagger.description = 'Desasigna un empleado específico de un equipo informático.'
      /* #swagger.parameters['equipoId'] = { 
          in: 'path',
          description: 'ID del equipo informático',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.removerEmpleadoAsignado(req, res, next);
    });

    this.post('/agregarMantenimiento', ['equipoinformatico.create.asignar.Mantenimiento'], passport.authenticate('jwt'), async (req, res, next) => {
      /* 
      #swagger.tags = ['Equipos Informaticos']
      #swagger.path = '/EquipoInformaticos/agregarMantenimiento'
      #swagger.method = 'post'
      #swagger.summary = 'Agrega un registro de mantenimiento a uno o varios equipos informáticos'
      #swagger.description = 'Agrega un registro de mantenimiento a uno o varios equipos informáticos. El cuerpo debe contener el idUsuario y un array de idsEquipos.'
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Objeto con la data de registro  y equipoId',
        required: true,
        schema: {
          type: 'object',
          properties: {
            registroData: {
              type: 'object',
              description: 'Datos del registro de mantenimiento',
              properties: {
                descripcion: { type: 'string' },
                fecha: { type: 'string', format: 'date-time' },
                realizadoPor: { type: 'string' }
              },
              required: ['descripcion', 'fecha', 'realizadoPor']
            },
            equipoId: {
              type: ['string', 'array'],
              description: 'ID del equipo informático',
              items: { type: 'string' }
            }
          },
          required: ['registroData', 'equipoId']
        }
      }
      #swagger.security = [{
        "bearerAuth": []
      }]
      */
      this.controller.agregarRegistroMantenimiento(req, res, next);
    });

    this.post('/:equipoId/removerMantenimiento/:registroId', ['equipoinformatico.create.desasignar.Mantenimiento'], passport.authenticate('jwt'), async (req, res, next) => {
      /* 
      #swagger.tags = ['Equipos Informaticos']
      #swagger.path = '/EquipoInformaticos/{equipoId}/removerMantenimiento/{registroId}'
      #swagger.method = 'post'
      #swagger.summary = 'Remueve un registro de mantenimiento de un equipo informático'
      #swagger.description = 'Remueve un registro de mantenimiento específico de un equipo informático.'
      #swagger.parameters['equipoId'] = { 
        in: 'path',
        description: 'ID del equipo informático',
        required: true,
        type: 'string'
      }
      #swagger.parameters['registroId'] = { 
        in: 'path',
        description: 'ID del registro de mantenimiento a remover',
        required: true,
        type: 'string'
      }
      #swagger.security = [{
        "bearerAuth": []
      }]
      */
      this.controller.removerRegistroMantenimiento(req, res, next);
    });

    this.post('/:equipoId/asignarTipo/:tipoId', ['equipoinformatico.create.asignar.Tipoequipo'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Equipos Informaticos']
      // #swagger.path = '/EquipoInformaticos/{equipoId}/asignarTipo/{tipoId}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Asigna un tipo de equipo a un equipo informático'
      // #swagger.description = 'Asigna un tipo de equipo específico a un equipo informático.'
      /* #swagger.parameters['equipoId'] = { 
          in: 'path',
          description: 'ID del equipo informático',
          required: true,
          type: 'string'
        }
        #swagger.parameters['tipoId'] = { 
          in: 'path',
          description: 'ID del tipo de equipo a asignar',
          required: true,
          type: 'string'
        }
      #swagger.security = [{
        "bearerAuth": []
      }] 
      */
      this.controller.asignarTipoequipo(req, res, next);
    });

    this.post('/:equipoId/asignarModelo/:modeloId', ['equipoinformatico.create.asignar.Modelo'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Equipos Informaticos']
      // #swagger.path = '/EquipoInformaticos/{equipoId}/asignarModelo/{modeloId}'
      // #swagger.method = 'post'
      // #swagger.summary = 'Asigna un modelo a un equipo informático'
      // #swagger.description = 'Asigna un modelo específico a un equipo informático.'
      /* #swagger.parameters['equipoId'] = { 
          in: 'path',
          description: 'ID del equipo informático',
          required: true,
          type: 'string'
        }
        #swagger.parameters['modeloId'] = { 
          in: 'path',
          description: 'ID del modelo a asignar',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
            "bearerAuth": []
        }] 
      */
      this.controller.asignarModelo(req, res, next);
    });
  }
}

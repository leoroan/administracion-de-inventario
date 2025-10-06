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

    this.post('/:equipoId/empleado/:empleadoId', ['equipoinformatico.create.asignar.Usuario'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Equipos Informaticos']
      // #swagger.path = '/EquipoInformaticos/{equipoId}/empleado/{empleadoId}'
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

    this.post('/:equipoId/mantenimiento', ['equipoinformatico.create.agregar.Mantenimiento'], passport.authenticate('jwt'), async (req, res, next) => {
      /*
      #swagger.tags = ['Equipos Informaticos']
      #swagger.path = '/EquipoInformaticos/{equipoId}/mantenimiento'
      #swagger.method = 'post'
      #swagger.summary = 'Agrega un registro de mantenimiento a un equipo informático'
      #swagger.description = 'Agrega un registro de mantenimiento a un equipo informático específico. El cuerpo debe contener los datos del mantenimiento.'
      #swagger.parameters['equipoId'] = { 
          in: 'path',
          description: 'ID del equipo informático',
          required: true,   
          type: 'string'
      }
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Mantenimiento"
            }
          }
        }
      }
      #swagger.security = [{
        "bearerAuth": []
      }]
    */
      this.controller.service.agregarRegistroMantenimiento(req, res, next);
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

    this.post('/:equipoId/modelo/:modeloId', ['equipoinformatico.create.asignar.Modelo'], passport.authenticate('jwt'), async (req, res, next) => {
      // #swagger.tags = ['Equipos Informaticos']
      // #swagger.path = '/EquipoInformaticos/{equipoId}/modelo/{modeloId}'
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

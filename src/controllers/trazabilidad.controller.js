import { devLogger } from '../config/logger/logger.config.js';
import { trazabilidadService } from '../services/service.js';
import GenericController from './helper/generic.controller.js';

// Crear un nuevo usuario
export default class TrazabilidadController extends GenericController {
  constructor(service) {
    super(service);
  }

}
import { devLogger } from '../config/logger/logger.config.js';
import { modeloService } from '../services/service.js';
import GenericController from './helper/generic.controller.js';

// Crear un nuevo usuario
export default class ModeloController extends GenericController {
  constructor(service) {
    super(service);
  }

}
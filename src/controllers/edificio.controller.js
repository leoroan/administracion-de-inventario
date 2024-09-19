import { devLogger } from '../config/logger/logger.config.js';
import { edificioService } from '../services/service.js';
import GenericController from './helper/generic.controller.js';

// Crear un nuevo usuario
export default class EdificioController extends GenericController {
  constructor(service) {
    super(service);
  }

}
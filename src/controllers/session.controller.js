import { devLogger } from '../config/logger/logger.config.js';
import { sessionService } from '../services/service.js';
import GenericController from './helper/generic.controller.js';

// Crear un nuevo usuario
export default class SessionController extends GenericController {
  constructor(service) {
    super(service);
  }

}
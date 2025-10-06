import GenericService from './helper/generic.service.js';
import { BadRequest, NotFound } from '../../config/error/errors.js';
import services from './servicesLoader.js';

export default class EdificioService extends GenericService {
  constructor(dao) {
    super(dao);
  }

  async agregarOficina(edificioId, oficinaId) {
    const edificio = await this.dao.findById(edificioId);
    if (!edificio) {
      throw new NotFound('Edificio no encontrado');
    }
    const oficina = await services.oficinaService.findById(oficinaId);
    if (!oficina) {
      throw new NotFound(`Oficina con ID ${oficinaId} no encontrada`);
    }
    const result = await edificio.addOficina(oficinaId);
    return result;
  }
}
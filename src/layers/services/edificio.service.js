import GenericService from './helper/generic.service.js';
import { BadRequest, NotFound } from '../../config/error/errors.js';
import services from './servicesLoader.js';

export default class EdificioService extends GenericService {
  constructor(dao) {
    super(dao);
  }

  async agregarOficina(edificioId, oficinaData) {
    const edificio = await this.dao.findById(edificioId);
    if (!edificio) {
      throw new NotFound('Edificio no encontrado');
    }
    const oficina = await edificio.addOficina(oficinaData);
    return oficina;
  }
}
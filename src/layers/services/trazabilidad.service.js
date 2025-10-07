import GenericService from './helper/generic.service.js';
import { models } from '../../config/db/sequelize.config.js';
import { BadRequest, NotFound } from '../../config/error/errors.js';

export default class TrazabilidadService extends GenericService {
  constructor(dao) {
    super(dao);
  }
  
  async registrarTrazabilidad(data, user) {
    const traza = {
      ...data,
      realizadoPor: user?.nombre + ' ' + user?.apellido || user?.email || 'No-Definido',
    };

    return await this.dao.create(traza);
  }
}

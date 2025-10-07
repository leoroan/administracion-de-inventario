import { BadRequest, NotFound } from '../../config/error/errors.js';
import GenericService from './helper/generic.service.js';

export default class MarcaService extends GenericService {
  constructor(dao) {
    super(dao);
  }

  async agregarModelo(marcaId, modeloId) {
    const marca = await this.dao.findByPk(marcaId);
    if (!marca) throw new NotFound('Marca not found');
    const modelo = await services.modeloService.findById(modeloId);
    if (!modelo) throw new NotFound(`Modelo con ID ${modeloId} no encontrado`);
    await marca.addModelo(modelo);
    return marca;
  }

  async removerModelo(marcaId, modeloId) {
    const marca = await this.dao.findByPk(marcaId);
    if (!marca) throw new NotFound('Marca not found');
    const modelo = await services.modeloService.findById(modeloId);
    if (!modelo) throw new NotFound(`Modelo con ID ${modeloId} no encontrado`);
    await marca.removeModelo(modelo);
    return marca;
  }

  async agregarModelos(marcaId, idsModelos) {
    const marca = await this.dao.findByPk(marcaId);
    if (!marca) throw new Error('Marca not found');
    if (!Array.isArray(idsModelos)) {
      throw new BadRequest('Los ids de modelos deben ser un array');
    }
    if (idsModelos.length === 0) {
      throw new BadRequest('El array de modelos no puede estar vacío');
    }
    const modelos = await services.modeloService.findAll({
      where: { id: idsModelos }
    });
    if (!modelos.length) throw new NotFound('No se encontraron modelos con los IDs proporcionados');
    await marca.addModelos(modelos);
    return marca;
  }
}
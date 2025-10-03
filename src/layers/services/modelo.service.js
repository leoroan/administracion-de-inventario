import GenericService from './helper/generic.service.js';
import { BadRequest, NotFound } from '../../config/error/errors.js';
import services from '../../layers/services/servicesLoader.js';
export default class ModeloService extends GenericService {
  constructor(dao) {
    super(dao);
  }

  async agregarMarca(modeloId, marcaId) {
    const modelo = await this.dao.findByPk(modeloId);
    if (!modelo) throw new NotFound('Modelo not found');
    const marca = await services.marcaService.findById(marcaId);
    if (!marca) throw new NotFound(`Marca con ID ${marcaId} no encontrada`);
    await modelo.setMarca(marca);
    return modelo;
  }

  async agregarEquipo(modeloId, equipoId) {
    const modelo = await this.dao.findByPk(modeloId);
    if (!modelo) throw new NotFound('Modelo not found');
    const equipo = await services.equipoInformaticoService.findById(equipoId);
    if (!equipo) throw new NotFound(`Equipo con ID ${equipoId} no encontrado`);
    await modelo.addEquipo(equipo);
    return modelo;
  }
}
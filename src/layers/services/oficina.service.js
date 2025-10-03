import GenericService from './helper/generic.service.js';
import { BadRequest, NotFound } from '../../../config/error/errors.js';
import services from '../../layers/services/servicesLoader.js';

export default class OficinaService extends GenericService {
  constructor(dao) {
    super(dao);
  }

  async agregarEmpleado(idOficina, idEmpleado) {
    const oficina = await this.dao.findByPk(idOficina);
    if (!oficina) {
      throw new NotFound('Oficina no encontrada');
    }
    const usuario = await services.usuario.findByPk(idEmpleado);
    if (!usuario) {
      throw new NotFound('Usuario no encontrado');
    }
    await oficina.addEmpleado(usuario);
    return usuario;
  }

  async agregarEmpleados(idOficina, idsEmpleados) {
    const oficina = await this.dao.findByPk(idOficina);
    if (!oficina) {
      throw new NotFound('Oficina no encontrada');
    }
    if (!Array.isArray(idsEmpleados)) {
      throw new Error('los ids de empleados deben ser un array');
    }
    if (idsEmpleados.length === 0) {
      throw new Error('El array de empleados no puede estar vacío');
    }
    const usuarios = await services.usuario.findAll({
      where: { id: idsEmpleados }
    });
    if (usuarios.length !== idsEmpleados.length) {
      throw new NotFound('Uno o más usuarios no encontrados');
    }
    await oficina.addEmpleados(usuarios);
    return usuarios;
  }

  async agregarSubOficina(idOficinaPadre, idOficinaHija) {
    const oficinaPadre = await this.dao.findByPk(idOficinaPadre);
    if (!oficinaPadre) {
      throw new NotFound('Oficina padre no encontrada');
    }
    const oficinaHija = await this.dao.findByPk(idOficinaHija);
    if (!oficinaHija) {
      throw new NotFound('Oficina hija no encontrada');
    }
    await oficinaPadre.addSuboficina(oficinaHija);
    return oficinaHija;
  }

  async agregarOficinaPadre(idOficinaHija, idOficinaPadre) {
    const oficinaHija = await this.dao.findByPk(idOficinaHija);
    if (!oficinaHija) {
      throw new NotFound('Oficina hija no encontrada');
    }
    const oficinaPadre = await this.dao.findByPk(idOficinaPadre);
    if (!oficinaPadre) {
      throw new NotFound('Oficina padre no encontrada');
    }
    await oficinaHija.setOficinaPadre(oficinaPadre);
    return oficinaPadre;
  }

}
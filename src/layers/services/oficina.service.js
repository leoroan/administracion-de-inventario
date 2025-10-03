import GenericService from './helper/generic.service.js';
import { BadRequest, NotFound } from '../../config/error/errors.js';
import services from '../../layers/services/servicesLoader.js';

export default class OficinaService extends GenericService {
  constructor(dao) {
    super(dao);
  }

  async agregarEmpleado(idOficina, idEmpleado) {
    const oficina = await this.dao.findById(idOficina);
    if (!oficina) {
      throw new NotFound('Oficina no encontrada');
    }
    const usuario = await services.usuarioService.findById(idEmpleado);
    if (!usuario) {
      throw new NotFound('Usuario no encontrado');
    }
    await oficina.addEmpleado(usuario);
    return usuario;
  }

  async agregarEmpleados(idOficina, idsEmpleados) {
    const oficina = await this.dao.findById(idOficina);
    if (!oficina) {
      throw new NotFound('Oficina no encontrada');
    }
    if (!Array.isArray(idsEmpleados)) {
      throw new Error('los ids de empleados deben ser un array');
    }
    if (idsEmpleados.length === 0) {
      throw new Error('El array de empleados no puede estar vacío');
    }
    const usuarios = await services.usuarioService.findAll({
      where: { id: idsEmpleados }
    });
    if (usuarios.length !== idsEmpleados.length) {
      throw new NotFound('Uno o más usuarios no encontrados');
    }
    await oficina.addEmpleados(usuarios);
    return usuarios;
  }

  async agregarSubOficina(idOficinaPadre, idOficinaHija) {
    const oficinaPadre = await this.dao.findById(idOficinaPadre);
    if (!oficinaPadre) {
      throw new NotFound('Oficina padre no encontrada');
    }
    const oficinaHija = await this.dao.findById(idOficinaHija);
    if (!oficinaHija) {
      throw new NotFound('Oficina hija no encontrada');
    }
    await oficinaPadre.addSuboficina(oficinaHija);
    return oficinaHija;
  }

  async agregarOficinaPadre(idOficinaHija, idOficinaPadre) {
    const oficinaHija = await this.dao.findById(idOficinaHija);
    if (!oficinaHija) {
      throw new NotFound('Oficina hija no encontrada');
    }
    const oficinaPadre = await this.dao.findById(idOficinaPadre);
    if (!oficinaPadre) {
      throw new NotFound('Oficina padre no encontrada');
    }
    await oficinaHija.setOficinaPadre(oficinaPadre);
    return oficinaPadre;
  }

  async asignarEdificio(idOficina, idEdificio) {
    const oficina = await this.dao.findById(idOficina);
    if (!oficina) {
      throw new NotFound('Oficina no encontrada');
    }
    const edificio = await services.edificioService.findById(idEdificio);
    if (!edificio) {
      throw new NotFound('Edificio no encontrado');
    }
    await oficina.setEdificio(edificio);
    return oficina;
  }

  async agregarEquipo(idOficina, idEquipo) {
    const oficina = await this.dao.findById(idOficina);
    if (!oficina) {
      throw new NotFound('Oficina no encontrada');
    }
    const equipo = await services.equipoinformaticoService.findById(idEquipo);
    if (!equipo) {
      throw new NotFound('Equipo informático no encontrado');
    }
    await oficina.addEquipo(equipo);
    return equipo;
  }

  async agregarEquipos(idOficina, idsEquipos) {
    const oficina = await this.dao.findById(idOficina);
    if (!oficina) {
      throw new NotFound('Oficina no encontrada');
    }
    if (!Array.isArray(idsEquipos)) {
      throw new BadRequest('los ids de equipos deben ser un array');
    }
    if (idsEquipos.length === 0) {
      throw new BadRequest('El array de equipos no puede estar vacío');
    }
    const equipos = await services.equipoinformaticoService.findAll({
      where: { id: idsEquipos }
    });
    if (equipos.length !== idsEquipos.length) {
      throw new NotFound('Uno o más equipos informáticos no encontrados');
    }
    await oficina.addEquipos(equipos);
    return equipos;
  }

}
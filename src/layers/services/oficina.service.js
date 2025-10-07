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

  async removerEmpleado(idOficina, idEmpleado) {
    const oficina = await this.dao.findById(idOficina);
    if (!oficina) {
      throw new NotFound('Oficina no encontrada');
    }
    const usuario = await services.usuarioService.findById(idEmpleado);
    if (!usuario) {
      throw new NotFound('Usuario no encontrado');
    }
    await oficina.removeEmpleado(usuario);
    return usuario;
  }

  async agregarEmpleados(idOficina, idsEmpleados) {
    if (!idOficina) {
      throw new BadRequest('Debe indicar un id de oficina');
    }
    if (!Array.isArray(idsEmpleados)) {
      throw new BadRequest('Los ids de empleados deben ser un array');
    }
    if (idsEmpleados.length === 0) {
      throw new BadRequest('El array de empleados no puede estar vacío');
    }
    const oficina = await this.dao.findById(idOficina);
    if (!oficina) {
      throw new NotFound('Oficina no encontrada');
    }
    const usuarios = await services.usuarioService.findAll({
      where: { id: idsEmpleados },
    });
    const encontrados = usuarios.map(u => u.id);
    const faltantes = idsEmpleados.filter(id => !encontrados.includes(id));
    if (faltantes.length) {
      throw new NotFound(`Usuarios no encontrados: ${faltantes.join(', ')}`);
    }
    await oficina.addEmpleados(usuarios);
    return usuarios;
  }

  async removerEmpleados(idOficina) {
    if (!idOficina) {
      throw new BadRequest('Debe indicar un id de oficina');
    }
    const oficina = await this.dao.findById(idOficina);
    if (!oficina) {
      throw new NotFound('Oficina no encontrada');
    }
    return oficina.setEmpleados([]);
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

  async removerSubOficina(idOficinaPadre, idOficinaHija) {
    const oficinaPadre = await this.dao.findById(idOficinaPadre);
    if (!oficinaPadre) {
      throw new NotFound('Oficina padre no encontrada');
    }
    const oficinaHija = await this.dao.findById(idOficinaHija);
    if (!oficinaHija) {
      throw new NotFound('Oficina hija no encontrada');
    }
    await oficinaPadre.removeSuboficina(oficinaHija);
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

  async removerOficinaPadre(idOficinaHija) {
    const oficinaHija = await this.dao.findById(idOficinaHija);
    if (!oficinaHija) {
      throw new NotFound('Oficina hija no encontrada');
    }
    await oficinaHija.setOficinaPadre(null);
    return oficinaHija;
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

  async removerEdificio(idOficina) {
    const oficina = await this.dao.findById(idOficina);
    if (!oficina) {
      throw new NotFound('Oficina no encontrada');
    }
    await oficina.setEdificio(null);
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

  async removerEquipo(idOficina, idEquipo) {
    const oficina = await this.dao.findById(idOficina);
    if (!oficina) {
      throw new NotFound('Oficina no encontrada');
    }
    const equipo = await services.equipoinformaticoService.findById(idEquipo);
    if (!equipo) {
      throw new NotFound('Equipo informático no encontrado');
    }
    await oficina.removeEquipo(equipo);
    return equipo;
  }

  async agregarEquipos(idOficina, idsEquipos) {
    if (!idOficina) {
      throw new BadRequest('Debe indicar un id de oficina');
    }
    if (!Array.isArray(idsEquipos)) {
      throw new BadRequest('los ids de equipos deben ser un array');
    }
    if (idsEquipos.length === 0) {
      throw new BadRequest('El array de equipos no puede estar vacío');
    }
    const oficina = await this.dao.findById(idOficina);
    if (!oficina) {
      throw new NotFound('Oficina no encontrada');
    }
    const equipos = await services.equipoinformaticoService.findAll({
      where: { id: idsEquipos }
    });
    const encontrados = equipos.map(u => u.id);
    const faltantes = idsEquipos.filter(id => !encontrados.includes(id));
    if (faltantes.length) {
      throw new NotFound(`Equipos no encontrados: ${faltantes.join(', ')}`);
    }
    await oficina.addEquipos(equipos);
    return equipos;
  }

  async removerEquipos(idOficina) {
    if (!idOficina) {
      throw new BadRequest('Debe indicar un id de oficina');
    }
    const oficina = await this.dao.findById(idOficina);
    if (!oficina) {
      throw new NotFound('Oficina no encontrada');
    }
    return oficina.setEquipos([]);
  }
}
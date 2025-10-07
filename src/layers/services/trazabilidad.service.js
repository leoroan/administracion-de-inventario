import GenericService from './helper/generic.service.js';
import services from '../../layers/services/servicesLoader.js';
import { BadRequest, NotFound } from '../../config/error/errors.js';
import { devLogger } from '../../config/logger/logger.config.js';

export default class TrazabilidadService extends GenericService {
  constructor(dao) {
    super(dao);
  }

  async registrarTrazabilidad(data, user) {
    const realizadoPor =
      user
        ? `${user.nombre || ''} ${user.apellido || ''}`.trim() || user.email || 'No-Definido'
        : 'No-Definido';

    const traza = {
      ...data,
      realizadoPor,
    };
    return await this.dao.create(traza);
  }

  async registrarTrazabilidadEquipoAusuario(usuario, equipo, user) {
    const data = {
      descripcion: `Se asignó el equipo MT ${equipo.mt} (n° serie: ${equipo.numeroDeSerie}) al usuario ${usuario.nombre} ${usuario.apellido}.`,
      accion: 'Asignación de equipo a usuario',
      equipoId: equipo.id,
      usuarioAsignado: `${usuario.nombre} ${usuario.apellido}`,
      oficina: equipo.oficina?.nombre || 'Sin oficina asignada',
      edificioId: equipo.oficina?.edificioId || null,
    };

    return this.registrarTrazabilidad(data, user);
  }

  async registrarTrazabilidadEquipoDesasignado(usuario, equipo, user) {
    const data = {
      accion: 'Desasignación de equipo de usuario',
      descripcion: `Se desasignó el equipo MT ${equipo.mt} (n° serie: ${equipo.numeroDeSerie}) al usuario ${usuario.nombre} ${usuario.apellido}.`,
      equipoId: equipo.id,
      usuarioAsignado: `${usuario.nombre} ${usuario.apellido}`,
      oficina: equipo.oficina?.nombre || 'Sin oficina asignada',
      edificioId: equipo.oficina?.edificioId || null,
    };

    return this.registrarTrazabilidad(data, user);
  }

  async registrarTrazabilidadEquipoAoficina(oficina, equipo, user) {
    const data = {
      accion: 'Asignación de equipo a oficina',
      descripcion: `Se asignó el equipo MT ${equipo.mt} (n° serie: ${equipo.numeroDeSerie}) a la oficina "${oficina.nombre}".`,
      equipoId: equipo.id,
      oficina: oficina.nombre || 'Sin oficina asignada',
      edificioId: oficina.edificioId || null,
    };

    return this.registrarTrazabilidad(data, user);
  }

  async registrarTrazabilidadEquipoDesasignadoDeOficina(oficina, equipo, user) {
    const data = {
      accion: 'Desasignación de equipo de oficina',
      descripcion: `Se desasignó el equipo MT ${equipo.mt} (n° serie: ${equipo.numeroDeSerie}) de la oficina "${oficina.nombre}".`,
      equipoId: equipo.id,
      oficina: oficina.nombre || 'Sin oficina asignada',
      edificioId: oficina.edificioId || null,
    };

    return this.registrarTrazabilidad(data, user);
  }
}

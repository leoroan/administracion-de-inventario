import GenericRepository from "./helper/generic.repository.js";

export default class TrazabilidadRepository extends GenericRepository {
  constructor(Trazabilidad) {
    super(Trazabilidad);
  }

  addTraza = async (userId, oficinaId, equipoId, tipoMovimiento, originario) => {
    return await this.dao.addTraza(userId, oficinaId, equipoId, tipoMovimiento, originario);
  }

  trazaNuevoEquipo = async (equipo, originario) => {
    return await this.dao.trazaNuevoEquipo(equipo, originario);
  }

}
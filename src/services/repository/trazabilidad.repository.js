import GenericRepository from "./helper/generic.repository.js";

export default class TrazabilidadRepository extends GenericRepository {
  constructor(Trazabilidad) {
    super(Trazabilidad);
  }

  addTraza = async (userId, oficinaId, equipoId) => {
    return await this.dao.addTraza(userId, oficinaId, equipoId);
  }

}
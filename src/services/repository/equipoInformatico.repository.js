import GenericRepository from "./helper/generic.repository.js";

export default class EquipoInformaticoRepository extends GenericRepository {
  constructor(EquipoInformaticoDAO) {
    super(EquipoInformaticoDAO);
  }

  findById_withEmpleadoDTO = async (some) => {
    return await this.dao.findById_withEmpleadoDTO(some);
  }

  findAll_withEmpleadoDTO = async (some) => {
    return await this.dao.findAll_withEmpleadoDTO(some);
  }
  
}
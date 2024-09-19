import GenericRepository from "./helper/generic.repository.js";

export default class EquipoInformaticoRepository extends GenericRepository {
  constructor(EquipoInformaticoDAO) {
    super(EquipoInformaticoDAO);
  }

  // findByEmailORusername = async (some) => {
  //   return await this.dao.findByEmailORusername(some);
  // }

}
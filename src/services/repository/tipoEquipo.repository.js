import GenericRepository from "./helper/generic.repository.js";

export default class TipoEquipoRepository extends GenericRepository {
  constructor(TipoEquipo) {
    super(TipoEquipo);
  }

  // findByEmailORusername = async (some) => {
  //   return await this.dao.findByEmailORusername(some);
  // }

}
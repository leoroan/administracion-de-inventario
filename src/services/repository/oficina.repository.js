import GenericRepository from "./helper/generic.repository.js";

export default class OficinaRepository extends GenericRepository {
  constructor(Oficina) {
    super(Oficina);
  }

  // findByEmailORusername = async (some) => {
  //   return await this.dao.findByEmailORusername(some);
  // }

}
import GenericRepository from "./helper/generic.repository.js";

export default class MarcaRepository extends GenericRepository {
  constructor(Marca) {
    super(Marca);
  }

  // findByEmailORusername = async (some) => {
  //   return await this.dao.findByEmailORusername(some);
  // }

}
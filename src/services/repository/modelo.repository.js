import GenericRepository from "./helper/generic.repository.js";

export default class ModeloRepository extends GenericRepository {
  constructor(Modelo) {
    super(Modelo);
  }

  // findByEmailORusername = async (some) => {
  //   return await this.dao.findByEmailORusername(some);
  // }

}
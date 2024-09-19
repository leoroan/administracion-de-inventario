import GenericRepository from "./helper/generic.repository.js";

export default class EdificioRepository extends GenericRepository {
  constructor(EdificioDAO) {
    super(EdificioDAO);
  }

  // findByEmailORusername = async (some) => {
  //   return await this.dao.findByEmailORusername(some);
  // }

}
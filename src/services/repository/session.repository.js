import GenericRepository from "./helper/generic.repository.js";

export default class SessionRepository extends GenericRepository {
  constructor(Session) {
    super(Session);
  }

  // findByEmailORusername = async (some) => {
  //   return await this.dao.findByEmailORusername(some);
  // }

}
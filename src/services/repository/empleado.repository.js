import EmpleadoDAO from "../db/dao/empleado.dao.js";
import GenericRepository from "./helper/generic.repository.js";

export default class EmpleadoRepository extends GenericRepository {
  constructor(EmpleadoDAO) {
    super(EmpleadoDAO);
  }

  findByEmailORusername = async (some) => {
    return await this.dao.findByEmailORusername(some);
  }

  findByEmail = async (email) => {
    return await this.dao.findByEmail(email);
  }

}
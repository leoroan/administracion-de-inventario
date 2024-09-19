import { SequelizeError } from "../../../utils/errors.js";
import GenericDAO from "./helper/generic.dao.js";
import { Op } from 'sequelize';

export default class EmpleadoDAO extends GenericDAO {
  constructor(Empleado) {
    super(Empleado);
  }

  async findByEmail(email) {
    try {
      const record = await this.model.findOne({ where: { email } });
      if (!record) throw new Error(`Employee not found`);
      return record;
    } catch (error) {
      throw SequelizeError.handleSequelizeError(error, `Error fetching Empleado by email`);
    }
  }

  async findByEmailORusername(some) {
    try {
      const record = await this.model.findOne({ where: { [Op.or]: [{ email: some }, { username: some }] } });
      if (!record) throw new Error(`Employee not found`);
      // if (!record) return null;
      return record;
    } catch (error) {
      throw SequelizeError.handleSequelizeError(error, `Error fetching Empleado by email or username`);
    }
  }
}
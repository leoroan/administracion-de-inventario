import { SequelizeError } from "../../../utils/errors.js";
import GenericDAO from "./helper/generic.dao.js";

export default class RegistroDeMantenimientoDeEquipoDAO extends GenericDAO {
  constructor(RegistroDeMantenimientoDeEquipo) {
    super(RegistroDeMantenimientoDeEquipo);
  }

  // async findByEmail(email) {
  //   try {
  //     const record = await this.model.findOne({ where: { email } });
  //     if (!record) throw new Error(`Employee not found`);
  //     return record;
  //   } catch (error) {
  //     throw SequelizeError.handleSequelizeError(error, `Error fetching Empleado by email`);
  //   }
  // }
}
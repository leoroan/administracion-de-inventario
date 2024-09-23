import { SequelizeError } from "../../../utils/errors.js";
import { Empleado } from "../models/Empleado.model.js";
import GenericDAO from "./helper/generic.dao.js";

export default class EquipoInformaticoDAO extends GenericDAO {
  constructor(EquipoInformatico) {
    super(EquipoInformatico);
  }

  async findById_withEmpleadoDTO(id) {
    try {
      const record = await this.model.findByPk(id, { include: { model: Empleado, attributes: ['id', 'nombre', 'apellido', 'oficinaId'] } });
      if (!record) throw new Error(`Equipo Informatico no encontrado`);
      return record;
    } catch (error) {
      throw SequelizeError.handleSequelizeError(error, `Error fetching Equipo Informatico`);
    }
  }

  async findAll_withEmpleadoDTO() {
    try {
      const records = await this.model.findAll({ include: { model: Empleado, attributes: ['id', 'nombre', 'apellido', 'oficinaId'] } });
      if (!records) throw new Error(`Equipos Informaticos no encontrados`);
      return records;
    } catch (error) {
      throw SequelizeError.handleSequelizeError(error, `Error fetching Equipos Informaticos`);
    }
  }

}
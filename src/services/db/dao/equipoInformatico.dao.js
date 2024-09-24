import { SequelizeError } from "../../../utils/errors.js";
import { Empleado } from "../models/Empleado.model.js";
import GenericDAO from "./helper/generic.dao.js";

export default class EquipoInformaticoDAO extends GenericDAO {
  constructor(EquipoInformatico) {
    super(EquipoInformatico);
  }

}
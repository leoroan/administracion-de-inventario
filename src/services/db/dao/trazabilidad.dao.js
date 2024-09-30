import { SequelizeError } from "../../../utils/errors.js";
import { empleadoService, equipoInformaticoService, oficinaService } from "../../service.js";
import GenericDAO from "./helper/generic.dao.js";

export default class TrazabilidadDAO extends GenericDAO {
  constructor(Trazabilidad) {
    super(Trazabilidad);
  }

  async addTraza(userId, oficinaId, equipoId) {
    let result;
    try {
      const equipo = await equipoInformaticoService.findById(equipoId, 'conRegistrosDeMantenimiento');
      if (equipo) {
        const equipId = equipo.dataValues.id;
        const mtEquipo = equipo.dataValues.mt;
        const registroId = equipo.dataValues.registroDeMantenimientoDeEquipo?.id;
        if (userId) {
          const user = await empleadoService.findById(userId, 'conOficina');          
          const nombreEmpleado = user.dataValues.nombre + " " + user.dataValues.apellido;
          const dniEmpleado = user.dataValues.dni;
          const nombreOficina = user.dataValues.Oficina ? user.dataValues.Oficina.nombre : "sin definir al momento de la asignacion";
          result = this.model.create({ nombreEmpleado: nombreEmpleado, dniEmpleado: dniEmpleado, mtEquipo: mtEquipo, idEquipo: equipId, nombreOficina: nombreOficina, registroDeMantenimientoDeEquipoId: registroId, estado: 'SE ASIGNO', equipoId: equipoId });
        } else {
          const oficina = await oficinaService.findById(oficinaId);
          const nombreOficina = oficina.dataValues.nombre;
          result = this.model.create({ nombreEmpleado: null, dniEmpleado: null, mtEquipo: mtEquipo, idEquipo: equipId, nombreOficina: nombreOficina, registroDeMantenimientoDeEquipoId: registroId, estado: 'SE ASIGNO', equipoId: equipoId });
        }
      }
      return result;
    } catch (error) {
      throw SequelizeError.handleSequelizeError(error, `Error creando ${this.model.name}`);
    }
  }


}
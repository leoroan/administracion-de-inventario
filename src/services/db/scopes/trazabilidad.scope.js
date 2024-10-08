import { EquipoInformatico } from "../models/EquipoInformatico.model.js";
import { RegistroDeMantenimientoDeEquipo } from "../models/registroDeMantenimientoDeEquipo.model.js";
import { Trazabilidad } from "../models/trazabilidad.model.js";

export const trazabilidadScope = {
  defaultScope: {
    attributes: ['id', 'nombreEmpleado', 'dniEmpleado', 'mtEquipo', 'idEquipo', 'nombreOficina', 'registroDeMantenimientoDeEquipoId', 'estado', 'createdAt', 'originario'],
    // include: [
    //   {
    //     model: EquipoInformatico,
    //     as: 'trazabilidades',
    //     attributes: ['id', 'mt', 'numeroDeSerie', 'numeroDePatrimonio'],
    //   }
    // ]
  },
}

export const defineTrazabilidadScope = () => {
  Trazabilidad.addScope('full', {
    attributes: ['id', 'nombreEmpleado', 'dniEmpleado', 'mtEquipo', 'idEquipo', 'nombreOficina', 'registroDeMantenimientoDeEquipoId', 'estado', 'createdAt', 'originario'],
    include: [
      {
        model: EquipoInformatico,
        as: 'EquipoInformatico',
        attributes: ['id', 'mt', 'numeroDeSerie', 'numeroDePatrimonio'],
      }
    ]
  })
}
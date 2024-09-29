import { Edificio } from "../models/Edificio.model.js";
import { EquipoInformatico } from "../models/EquipoInformatico.model.js";
import { RegistroDeMantenimientoDeEquipo } from "../models/registroDeMantenimientoDeEquipo.model.js";

export const trazabilidadScope = {
  defaultScope: {
    attributes: ['id', 'nombreEmpleado', 'dniEmpleado', 'nombreOficina', 'estado', 'createdAt'],
  },
}

export const defineTrazabilidadScope = () => {
  Edificio.addScope('full', {
    attributes: ['id', 'nombreEmpleado', 'dniEmpleado', 'nombreOficina', 'estado', 'createdAt'],
    include: [
      {
        model: EquipoInformatico,
        as: 'EquipoInformaticos',
        attributes: ['id', 'mt', 'numeroDeSerie', 'numeroDePatrimonio'],
        include: [
          {
            model: RegistroDeMantenimientoDeEquipo,
            as: 'RegistroDeMantenimientoDeEquipos',
            attributes: ['id', 'tipoMantenimiento', 'tecnicoResponsable', 'createdAt', 'updatedAt']
          }
        ]
      }
    ]
  })
}
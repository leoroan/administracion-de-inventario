import { RegistroDeMantenimientoDeEquipo } from "../models/registroDeMantenimientoDeEquipo.model.js";

export const registroDeMantenimientoDeEquipoScope = {
  defaultScope: {
    attributes: ['id', 'tipoMantenimiento', 'descripcion', 'tecnicoResponsable', 'proximoMantenimiento', 'observaciones', 'createdAt', 'updatedAt', 'deletedAt'],
  },
}

export const defineRegistroDeMantenimientoDeEquipoScope = () => {
  RegistroDeMantenimientoDeEquipo.addScope('full', {
    // attributes: ['id'],
    // include: [
    // ]
  })
}
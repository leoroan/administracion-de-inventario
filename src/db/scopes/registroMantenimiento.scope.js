export default {
  defaultScope: {
    attributes: ['id', "fecha", "descripcion", "tecnico", "proximoMantenimiento", "observaciones", 'updatedAt'],
  },

  withEquipoScope: {
    attributes: ['id', "fecha", "descripcion", "tecnico", "proximoMantenimiento", "observaciones", 'updatedAt'],
    include: [
      {
        association: 'equipo',
        as: 'equipo',
        attributes: ['id', "mt", "numeroDeSerie", "numeroDePatrimonio", "estado", "disponibilidad", "observaciones", "remitoNro", 'updatedAt'],
      },
    ],
  },
}
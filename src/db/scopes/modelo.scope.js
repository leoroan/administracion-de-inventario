export default {
  defaultScope: {
    attributes: ['id', "nombre", "descripcion", "url", "imagenUrl", 'updatedAt'],
  },

  withMarcaScope: {
    attributes: ['id', "nombre", "descripcion", "url", "imagenUrl", 'updatedAt'],
    include: [
      {
        association: 'marca',
        as: 'marca',
        attributes: ['id', "nombre", "descripcion", "url", "logoUrl", 'updatedAt'],
      }
    ]
  },

  withTipoequipoScope: {
    attributes: ['id', "nombre", "descripcion", "url", "imagenUrl", 'updatedAt'],
    include: [
      {
        association: 'tipoequipo',
        as: 'tipoequipo',
        attributes: ['id', "nombre", "descripcion", "updatedAt"],
      }
    ]
  },

  withEquiposScope: {
    attributes: ['id', "nombre", "descripcion", "url", "imagenUrl", 'updatedAt'],
    include: [
      {
        association: 'equipos',
        as: 'equipos',
        attributes: ['id', "mt", "numeroDeSerie", "numeroDePatrimonio", "estado", "disponibilidad", "observaciones", "remitoNro", 'updatedAt'],

      }
    ]
  }
}
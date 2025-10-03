export default {
  defaultScope: {
    attributes: ['id', "nombre", "descripcion", "updatedAt"],
  },

  withModeloScope: {
    attributes: ['id', "nombre", "descripcion", "updatedAt"],
    include: [
      {
        association: 'modelos',
        as: 'modelos',
        attributes: ['id', "nombre", "descripcion", "url", "imagenUrl", 'updatedAt']
      }
    ]
  },

  withEquiposScope: {
    attributes: ['id', "nombre", "descripcion", "updatedAt"],
    include: [
      {
        association: 'equipos',
        as: 'equipos',
        attributes: ['id', "mt", "numeroDeSerie", 'updatedAt'],
      }
    ]
  }
}
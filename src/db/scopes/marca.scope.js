export default {
  defaultScope: {
    attributes: ['id', "nombre", "descripcion", "url", "logoUrl", 'updatedAt'],
  },

  withModeloScope: {
    attributes: ['id', "nombre", "descripcion", "url", "logoUrl", 'updatedAt'],
    include: [
      {
        association: 'modelos',
        as: 'modelos',
        attributes: ['id', "nombre", "descripcion", "url", "logoUrl", 'updatedAt']
      }
    ]
  }
}
export default {
  defaultScope: {
    attributes: ['id', 'nombre', 'direccion', 'descripcion', 'telefono', 'coordenadas', 'updatedAt'],
  },

  withOficinasScope: {
    attributes: ['id', 'nombre', 'direccion', 'descripcion', 'telefono', 'coordenadas', 'updatedAt'],
    include: [
      {
        association: 'oficinas',
        as: 'oficinas',
        attributes: ['id', 'nombre', 'descripcion', 'telefono', 'email', 'updatedAt'],
      },
    ],
  },
}
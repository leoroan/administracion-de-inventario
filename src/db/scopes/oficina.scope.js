export default {
  defaultScope: {
    attributes: ['id', 'nombre', 'descripcion', 'telefono', 'email', 'updatedAt'],
  },

  withEmpleadosScope: {
    attributes: ['id', 'nombre', 'descripcion', 'telefono', 'email', 'updatedAt'],
    include: [
      {
        association: 'empleados',
        as: 'empleados',
        attributes: ['id', 'nombre', 'apellido', 'username', 'email', 'dni', 'bloqueado', 'ultimoIngreso', 'updatedAt', 'emailVerificado'],
      },
    ],
  },

  withSubOficinaScope: {
    attributes: ['id', 'nombre', 'descripcion', 'telefono', 'email', 'updatedAt'],
    include: [
      {
        association: 'suboficinas',
        as: 'suboficinas',
        attributes: ['id', 'nombre', 'descripcion', 'telefono', 'email', 'updatedAt'],
      },
      {
        association: 'oficinaPadre',
        as: 'oficinaPadre',
        attributes: ['id', 'nombre', 'descripcion', 'telefono', 'email', 'updatedAt'],
      },
    ],
  },

  withEdificioScope: {
    attributes: ['id', 'nombre', 'descripcion', 'telefono', 'email', 'updatedAt'],
    include: [
      {
        association: 'edificio',
        as: 'edificio',
        attributes: ['id', 'nombre', 'direccion', 'telefono', 'descripcion', 'updatedAt'],
      },
    ],
  },

  withEquipoInformaticoScope: {
    attributes: ['id', 'nombre', 'descripcion', 'telefono', 'email', 'updatedAt'],
    include: [
      {
        association: 'equipos',
        as: 'equipos',
        attributes: ['id', 'mt', 'numeroDeSerie', 'estado', 'updatedAt'],
      },
    ],
  },
};

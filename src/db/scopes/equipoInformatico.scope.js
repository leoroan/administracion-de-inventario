export default {
  defaultScope: {
    attributes: ['id', "mt", "numeroDeSerie", "numeroDePatrimonio", "estado", "disponibilidad", "observaciones", "remitoNro", "empleadoId", "oficinaId", 'updatedAt'],
  },

  withOficinaScope: {
    attributes: ['id', "mt", "numeroDeSerie", "numeroDePatrimonio", "estado", "disponibilidad", "observaciones", "remitoNro", "empleadoId", "oficinaId", 'updatedAt'],
    include: [
      {
        association: 'oficina',
        as: 'oficina',
        attributes: ['id', 'nombre', 'descripcion', 'telefono', 'email', 'updatedAt'],
      },
    ],
  },

  withUsuarioScope: {
    attributes: ['id', "mt", "numeroDeSerie", "numeroDePatrimonio", "estado", "disponibilidad", "observaciones", "remitoNro", "empleadoId", "oficinaId", 'updatedAt'],
    include: [
      {
        association: 'empleadoAsignado',
        as: 'empleadoAsignado',
        attributes: ['id', 'nombre', 'apellido', 'username', 'email', 'dni', 'bloqueado', 'ultimoIngreso', 'updatedAt', 'emailVerificado'],
      },
    ],
  },

  withRegistroMantenimientoScope: {
    attributes: ['id', "mt", "numeroDeSerie", "numeroDePatrimonio", "estado", "disponibilidad", "observaciones", "remitoNro", "empleadoId", "oficinaId", 'updatedAt'],
    include: [
      {
        association: 'registrosMantenimiento',
        as: 'registrosMantenimiento',
        attributes: ['id', 'fecha', 'descripcion', "tecnico", "proximoMantenimiento", "observaciones", 'createdAt', 'updatedAt'],
      },
    ],
  },

  withTipoEquipoScope: {
  attributes: ['id', "mt", "numeroDeSerie", "numeroDePatrimonio", "estado", "disponibilidad", "observaciones", "remitoNro", 'updatedAt'],
  include: [
    {
      association: 'tipoequipo',
      as: 'tipoequipo',
      attributes: ['id', 'nombre', 'descripcion', 'updatedAt'],
      include: [
        {
          association: 'modelos',
          as: 'modelos',
          attributes: ['id', 'nombre', 'descripcion', 'updatedAt'],
          include: [
            {
              association: 'marca',
              as: 'marca',
              attributes: ['id', 'nombre', 'descripcion', 'updatedAt'],
            },
          ],
        },
      ],
    },
  ],
},
}
export default {
  defaultScope: {
    attributes: ['id', 'nombre', 'apellido', 'username', 'email', 'dni', 'bloqueado', 'ultimoIngreso', 'updatedAt', 'emailVerificado'],
  },

  loginScope: {
    attributes: ['id', 'dni', 'username', 'nombre', 'apellido', 'email', 'bloqueado', 'ultimoIngreso', 'password', 'emailVerificado', 'cantidadIntentosLoggin', 'bloqueoExpiration'],
    include: [
      {
        association: 'rolPrincipal',
        as: 'rolPrincipal',
        attributes: ['id', 'nombre'],
      },
    ],
  },

  withRolScope: {
    attributes: ['id', 'nombre', 'apellido', 'username', 'email', 'dni', 'bloqueado', 'ultimoIngreso', 'updatedAt'],
    include: [
      {
        association: 'rolPrincipal',
        as: 'rolPrincipal',
        attributes: ['id', 'nombre'],
      },
    ],
  },

  withPermisosScope: {
    attributes: ['id', 'nombre', 'apellido', 'username', 'email', 'dni', 'bloqueado', 'ultimoIngreso', 'updatedAt'],
    include: [
      {
        association: 'rolPrincipal',
        as: 'rolPrincipal',
        attributes: ['id', 'nombre'],
      },
      {
        association: 'permisos',
        as: 'permisos',
        attributes: ['accion', 'descripcion'],
        through: { attributes: [] }
      }
    ],
  },
};



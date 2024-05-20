import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";

const Empleado = sequelize.define('Empleado', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'SIN REGISTRAR'
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  rol: {
    type: DataTypes.ENUM('MINISTRO', 'SECRETARIO', 'SUBSECRETARIO', 'DIRECTOR', 'DIRECTOR_DE_LINEA', 'EMPLEADO', 'NO_DEFINIDO'),
    allowNull: false,
    defaultValue: 'EMPLEADO'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
}, {
  timestamps: true, paranoid: true,
  hooks: {
    beforeCreate: async (instance) => {
      // Transformar datos a mayúsculas
      instance.nombre = instance.nombre.toUpperCase();
      instance.apellido = instance.apellido.toUpperCase();
      instance.rol = instance.rol.toUpperCase();
      instance.email = instance.email.toUpperCase();
    }
  }
});

export { Empleado };
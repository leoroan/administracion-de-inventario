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
    defaultValue: 'sin registrar'    
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  rol: {
    type: DataTypes.ENUM('ministro', 'secretario', 'subsecretario', 'director', 'director_de_linea', 'empleado', 'no_definido'),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
}, { timestamps: true, paranoid: true });

export { Empleado };
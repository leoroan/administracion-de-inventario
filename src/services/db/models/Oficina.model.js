import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";

const Oficina = sequelize.define('Oficina', {
  nombre: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'sin descripcion'
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true
    }
  },
}, { timestamps: true, paranoid: true });

export { Oficina };
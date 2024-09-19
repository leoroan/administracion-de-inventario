import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";

const Rol = sequelize.define('Rol', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export { Rol };

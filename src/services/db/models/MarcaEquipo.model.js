import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";

const MarcaEquipo = sequelize.define('MarcaEquipo', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, { timestamps: true, paranoid: true });

export { MarcaEquipo };
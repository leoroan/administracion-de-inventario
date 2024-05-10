import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";

const MarcaEquipo = sequelize.define('MarcaEquipo', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, { timestamps: true, paranoid: true });

export { MarcaEquipo };
import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";

const ModeloEquipo = sequelize.define('ModeloEquipo', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, { timestamps: true, paranoid: true });

export { ModeloEquipo };
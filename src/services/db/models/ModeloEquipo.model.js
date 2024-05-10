import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";

const ModeloEquipo = sequelize.define('ModeloEquipo', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, { timestamps: true, paranoid: true });

export { ModeloEquipo };
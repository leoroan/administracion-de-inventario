import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";

const TipoEquipo = sequelize.define('TipoEquipo', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, { timestamps: true, paranoid: true });

export { TipoEquipo };


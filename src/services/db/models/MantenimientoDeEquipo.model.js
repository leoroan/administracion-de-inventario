import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";

const MantenimientoDeEquipo = sequelize.define('MantenimientoDeEquipo', {
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imagen: {
    type: DataTypes.BLOB, 
    allowNull: true
  }
}, { timestamps: true, paranoid: true });


export { MantenimientoDeEquipo };
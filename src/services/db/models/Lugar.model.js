import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";

const Lugar = sequelize.define('Lugar', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  calle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  altura: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  comentario: {
    type: DataTypes.STRING,
    allowNull: true
  },

}, { tableName: 'Lugares', timestamps: true, paranoid: true });

export { Lugar }
import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";

const EquipoInformatico = sequelize.define('EquipoInformatico', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mt: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numeroDeSerie: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numeroDePatrimonio: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  estado: {
    type: DataTypes.ENUM('asignado', 'disponible', 'baja'),
    defaultValue: 'disponible'
  },
  observacion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  especificacionesTecnicas: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precio: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue: 0
  },
  remitoNumero: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, { timestamps: true, paranoid: true });


export { EquipoInformatico }
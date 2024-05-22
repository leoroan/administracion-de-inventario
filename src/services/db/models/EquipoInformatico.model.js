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
    defaultValue: 9999
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
    type: DataTypes.ENUM('ASIGNADO', 'DISPONIBLE', 'BAJA'),
    defaultValue: 'DISPONIBLE'
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
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'SIN DATOS'
  },
  tipoEquipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true, paranoid: true, hooks: {
    beforeCreate: async (instance) => {
      instance.marca = instance.marca.toUpperCase();
      instance.modelo = instance.modelo.toUpperCase();
      instance.estado = instance.estado.toUpperCase();
      instance.observacion = instance.observacion.toUpperCase();
      instance.especificacionesTecnicas = instance.especificacionesTecnicas.toUpperCase();
      instance.tipoEquipo = instance.tipoEquipo.toUpperCase();
    }
  }
});


export { EquipoInformatico }
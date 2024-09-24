import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";

const toUpperCaseFields = async (instance) => {
  const fieldsToUpper = ["observacion", "especificacionesTecnicas", "tipoEquipo"];
  fieldsToUpper.forEach((field) => {
    if (instance.dataValues[field]) {
      instance.dataValues[field] = instance.dataValues[field].toUpperCase();
    }
  });
};

const EquipoInformatico = sequelize.define('EquipoInformatico', {
  mt: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 999999
  },
  numeroDeSerie: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
    defaultValue: "SIN OBSERVACIONES"
  },
  especificacionesTecnicas: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "SIN ESPECIFICAR"
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
  }
}, {
  tableName: 'equiposInformaticos',
  timestamps: true,
  paranoid: true,
  hooks: {
    beforeCreate: toUpperCaseFields,
    beforeUpdate: toUpperCaseFields,
  }
});


export { EquipoInformatico }
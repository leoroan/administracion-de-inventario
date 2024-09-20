import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";

const toUpperCaseFields = async (instance) => {
  const fieldsToUpper = ['observaciones', 'tecnicoResponsable'];
  fieldsToUpper.forEach((field) => {
    if (instance.dataValues[field]) {
      instance.dataValues[field] = instance.dataValues[field].toUpperCase();
    }
  });
};

const RegistroDeMantenimientoDeEquipo = sequelize.define('RegistroDeMantenimientoDeEquipo', {
  tipoMantenimiento: {
    type: DataTypes.ENUM('PREVENTIVO', 'CORRECTIVO', 'ACTUALIZACION'),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tecnicoResponsable: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  proximoMantenimiento: {
    type: DataTypes.DATE,
  },
  observaciones: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'registrosDeMantenimientoDeEquipos',
  timestamps: true,
  paranoid: true,
  hooks: {
    beforeCreate: toUpperCaseFields,
    beforeUpdate: toUpperCaseFields,
  }
});


export { RegistroDeMantenimientoDeEquipo };
import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";

const toUpperCaseFields = async (instance) => {
  const fieldsToUpper = ['username', 'email', 'nombre', 'apellido'];

  fieldsToUpper.forEach((field) => {
    if (instance.dataValues[field]) {
      instance.dataValues[field] = instance.dataValues[field].toUpperCase();
    }
  });

  // console.log(instance.toJSON()); // Para verificar que todos los campos estén presentes
};

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('INSPECTOR', 'SUPERVISOR', 'ADMIN'),
    defaultValue: 'INSPECTOR'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tokenExpiration: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true,
  paranoid: true,
  hooks: {
    beforeCreate: toUpperCaseFields,
    beforeUpdate: toUpperCaseFields
  }
});

export { User };

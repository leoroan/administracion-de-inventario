import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";
import { devLogger } from "../../../config/logger/logger.config.js";

const toUpperCaseFields = async (instance) => {
  const fieldsToUpper = ['username', 'email', 'nombre', 'apellido'];

  fieldsToUpper.forEach((field) => {
    if (instance.dataValues[field]) {
      instance.dataValues[field] = instance.dataValues[field].toUpperCase();
    }
  });
};

const verifyBloquedUser = async (results) => {
  if (Array.isArray(results)) {
    for (const user of results) {
      await user.desbloquearSiCorresponde();
    }
  } else if (results) {
    await results.desbloquearSiCorresponde();
  }
}

const Empleado = sequelize.define('Empleado', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'SIN REGISTRAR'
  },
  rol: {
    type: DataTypes.ENUM('MINISTRO', 'SECRETARIO', 'SUBSECRETARIO', 'DIRECTOR', 'DIRECTOR DE LINEA', 'EMPLEADO', 'NO_DEFINIDO'),
    allowNull: false,
    defaultValue: 'EMPLEADO'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tokenExpiration: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cantidadIntentosLoggin: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1
  },
  bloqueado: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  bloqueoExpiration: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ultimoIngreso: {
    type: DataTypes.DATE,
  }
}, {
  timestamps: true,
  paranoid: true,
  hooks: {
    beforeCreate: toUpperCaseFields,
    beforeUpdate: toUpperCaseFields,
    afterFind: verifyBloquedUser
  }
});

Empleado.prototype.intentarBloquearUsuario = async function () {
  try {
    await this.increment('cantidadIntentosLoggin');
    const fechaActual = new Date();
    const diferenciaEnMinutos = (fechaActual - this.updatedAt) / 60000;
    if (diferenciaEnMinutos > 10) {
      await this.update({
        cantidadIntentosLoggin: 1
      });
    } else if (this.cantidadIntentosLoggin >= 2) {
      await this.update({
        bloqueado: true,
        bloqueoExpiration: new Date()
      });
    }
  } catch (error) {
    devLogger.error('Error al bloquear al usuario:', error);
  }
};

Empleado.prototype.desbloquearSiCorresponde = async function () {
  try {
    const fechaActual = new Date();
    if (this.bloqueado && this.bloqueoExpiration && fechaActual > this.bloqueoExpiration) {
      const diferenciaEnMinutos = (fechaActual - this.bloqueoExpiration) / 60000;
      if (diferenciaEnMinutos >= 20) {
        await this.update({
          bloqueado: false,
          cantidadIntentosLoggin: 0,
          bloqueoExpiration: null
        });
      }
    }
  } catch (error) {
    devLogger.error('Error al desbloquear al usuario:', error);
  }
};

export { Empleado };

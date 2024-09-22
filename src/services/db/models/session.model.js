import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";
import { devLogger } from "../../../config/logger/logger.config.js"; 3

const calcularMaximoTiempoSesionHistorico = async (instance) => {  
  if (instance.fechaExpiracion) {
    const tiempoSesion = Math.floor(
      (new Date(instance.fechaExpiracion) - new Date(instance.fechaInicio)) / 1000 //lo convierto a segundos
    );
    instance.tiempoSesion = tiempoSesion;
    if (!instance.maximoTiempoSesionHistorico || tiempoSesion > instance.maximoTiempoSesionHistorico) {
      instance.maximoTiempoSesionHistorico = tiempoSesion;
    }
  }
}

const establecerFechaExpiracion = async (instance) => {
  const ultimaConexion = new Date(Session.ultimaConexion);
  const fechaExpiracion = new Date(Session.fechaExpiracion);  
  if (ultimaConexion > fechaExpiracion) {
    devLogger.error('La última conexión es posterior a la fecha de expiración.');
    instance.tokenSesion = "null";
  }
}

const calcularExpiracionDeSesion = async (instance) => {
  console.log("changed?");
  console.log(instance.changed('fechaExpiracion'));
  if (instance.changed('fechaExpiracion')) {
    const fechaActual = new Date();
    const fechaExpiracion = new Date(fechaActual.getTime() + 3600000); // 1 hora
    instance.fechaExpiracion = fechaExpiracion;
  }
}

const verifyBloquedUser = async (results) => {
  if (Array.isArray(results)) {
    for (const user of results) {
      await user.desbloquearSiCorresponde();
    }
  } else if (results) {
    await results.desbloquearSiCorresponde();
  }
}

const Session = sequelize.define('Sesion', {
  tokenSesion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  fechaExpiracion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  ultimaConexion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  direccionIP: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tiempoSesion: {
    type: DataTypes.INTEGER, // Guardamos el tiempo en segundos
    allowNull: true,
  },
  maximoTiempoSesionHistorico: {
    type: DataTypes.INTEGER, // Guardamos el máximo histórico en segundos
    allowNull: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetTokenExpiration: {
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
    afterUpdate: calcularExpiracionDeSesion,
    beforeCreate: establecerFechaExpiracion,
    beforeUpdate: calcularMaximoTiempoSesionHistorico,
    afterFind: verifyBloquedUser
  }
});

Session.prototype.intentarBloquearUsuario = async function () {
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

Session.prototype.desbloquearSiCorresponde = async function () {
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

export { Session };

import _sequelize from 'sequelize';
const { Model } = _sequelize;

export default class EquipoInformatico extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      mt: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 99999999
      },
      numeroDeSerie: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      numeroDePatrimonio: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      estado: {
        type: DataTypes.ENUM('activo', 'inactivo', 'mantenimiento', 'baja'),
        allowNull: false,
        defaultValue: 'activo'
      },
      disponibilidad:{
        type: DataTypes.ENUM('asignado', 'no disponible', 'disponible'),
        allowNull: false,
        defaultValue: 'disponible'
      },
      observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'SIN OBSERVACIONES'
      },
      remitoNro: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
    }, {
      sequelize,
      modelName: 'EquipoInformatico',
      tableName: 'EquiposInformaticos',
      timestamps: true,
      paranoid: true
    });
  }
}

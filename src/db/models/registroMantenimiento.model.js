import _sequelize from 'sequelize';
const { Model } = _sequelize;

export default class RegistroMantenimiento extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'SIN DESCRIPCIÓN'
      },
      tecnico: {
        type: DataTypes.STRING,
        allowNull: true
      },
      proximoMantenimiento: {
        type: DataTypes.DATE,
        allowNull: true
      },
      observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'SIN OBSERVACIONES'
      },
    }, {
      sequelize,
      modelName: 'RegistroMantenimiento',
      tableName: 'RegistrosMantenimientos',
      timestamps: true,
      paranoid: true
    });
  }
}

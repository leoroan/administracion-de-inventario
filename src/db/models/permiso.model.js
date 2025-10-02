import _sequelize from 'sequelize';
const { Model } = _sequelize;

export default class Permiso extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      accion: {
        type: DataTypes.STRING(50),
      },
      descripcion: {
        type: DataTypes.STRING(100),
      },
    }, {
      sequelize,
      modelName: 'Permiso',
      tableName: 'Permisos',
      timestamps: true,
    });
  }
}

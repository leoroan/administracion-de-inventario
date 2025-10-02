import _sequelize from 'sequelize';
const { Model } = _sequelize;

export default class Rol extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      nombre: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true,
      },
      defaultPermisos: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    }, {
      sequelize,
      modelName: 'Rol',
      tableName: 'roles',
      timestamps: true,
      paranoid: true,
    });
  }
}

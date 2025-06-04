import _sequelize from 'sequelize';
const { Model } = _sequelize;

export default class Rol extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      nombre: {
        type: DataTypes.STRING(50),
      },
      nivel: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      permisos: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
      }
    }, {
      sequelize,
      modelName: 'Rol',
      tableName: 'roles',
      timestamps: true,
      paranoid: true,
    });
  }
}
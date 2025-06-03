import _sequelize from 'sequelize';
const { Model } = _sequelize;

export default class Trazabilidad extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      fecha: {
        type: DataTypes.DATE,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      accion: {
        type: DataTypes.STRING,
        allowNull: true
      },
      realizadoPor: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Trazabilidad',
      tableName: 'Trazabilidades',
      timestamps: true,
      paranoid: true
    });
  }
}

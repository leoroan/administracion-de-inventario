import _sequelize from 'sequelize';
const { Model } = _sequelize;

export default class Trazabilidad extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      accion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      realizadoPor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      equipoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      usuarioAsignado: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      oficina: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      edificioId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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

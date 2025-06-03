import _sequelize from 'sequelize';
const { Model } = _sequelize;

export default class Oficina extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        nombre: {
          type: DataTypes.STRING,
          allowNull: false
        },
        descripcion: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        telefono: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        }
      },
      {
        sequelize,
        modelName: 'Oficina',
        tableName: 'Oficinas',
        timestamps: true,
        paranoid: true
      }
    );
  }
}

import _sequelize from 'sequelize';
const { Model } = _sequelize;

export default class ModeloEquipo extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      imagenUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'default-modelo.png'
      },
    }, {
      sequelize,
      modelName: 'ModeloEquipo',
      tableName: 'ModelosEquipos',
      timestamps: true,
      paranoid: true
    });
  }
}

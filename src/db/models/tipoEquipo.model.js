import _sequelize from 'sequelize';
const { Model } = _sequelize;

export default class TipoEquipo extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'SIN ESPECIFICAR'
      }
    }, {
      sequelize,
      modelName: 'TipoEquipo',
      tableName: 'TiposEquipos',
      timestamps: true,
      paranoid: true
    });
  }
}

import _sequelize from 'sequelize';
const { Model } = _sequelize;

export default class Marca extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
      descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'SIN DESCRIPCIÓN'
      },
      url : {
        type: DataTypes.STRING,
        allowNull: true,
      },
      logoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'default-logo.png'
      }
    }, {
      sequelize,
      modelName: 'Marca',
      tableName: 'Marcas',
      timestamps: true,
      paranoid: true
    });
  }
}

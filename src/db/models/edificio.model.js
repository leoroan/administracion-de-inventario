import _sequelize from 'sequelize';
const { Model } = _sequelize;

export default class Edificio extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      direccion: {
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
        unique: true
      },
      coordenadas: {
        // const point = { type: 'Point', coordinates: [-76.984722, 39.807222]}; // GeoJson format: [lng, lat]
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: true
      },
    }, {
      sequelize,
      modelName: 'Edificio',
      tableName: 'Edificios',
      timestamps: true,
      paranoid: true
    });
  }
}

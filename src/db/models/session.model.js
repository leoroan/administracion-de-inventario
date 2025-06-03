import _sequelize from 'sequelize';
const { Model } = _sequelize;

export default class Session extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: true
      },
      userAgent: {
        type: DataTypes.STRING,
        allowNull: true
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Session',
      tableName: 'Sessions',
      timestamps: true,
      paranoid: true
    });
  }
}

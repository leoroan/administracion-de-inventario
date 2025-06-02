import { Sequelize } from "sequelize";
import config from '../configuration.js';
import initModels from "../../db/models/init-models.js";
import initScopes from "../../db/scopes/init-scopes.js";

const database = config.db.database;
const username = config.db.user;
const password = config.db.password;
const host = config.db.host;
const port = config.db.db_port;
const dialect = config.db.db_dialect;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port || 3306,
  dialect: dialect,
  timezone: '-03:00',
  logging: false,
  dialectOptions: {
    dateStrings: true
  }
});

const models = initModels(sequelize);
initScopes(models);

export { sequelize, models };
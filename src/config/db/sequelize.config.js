import { Sequelize } from "sequelize";
import config from '../configuration.js';
import { devLogger } from "../logger/logger.config.js";

const database = config.db.database;
const username = config.db.user;
const password = config.db.password;
const host = config.db.host;
const port = config.db.db_port;
// const environment = config.environment;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port || 3306,
  dialect: 'mysql',
  timezone: '-03:00',
  logging: false,
  // logging: msg => devLogger.debug(msg)
});

export { sequelize };
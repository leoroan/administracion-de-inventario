import express from 'express';
import config from './config/config.js';
import configureExpress from './config/server/express.config.js';
import { sequelize } from './services/db/models/models.setup.db.js';
import { devLogger } from './config/logs/logger.config.js';
import { checkConnection } from "./config/mail/nodemailer.config.js";
const SERVER_PORT = config.port;

const app = express();
configureExpress(app);

const connectWithRetry = () => {
  return sequelize.authenticate()
    .then(() => {
      devLogger.debug('Sequelize db connection success');
      return sequelize.sync({  alter: true });
      return sequelize.sync();
    })
    .then(() => {
      devLogger.debug('Syncing models, done connection');
      // console.log("seqs.models: ", sequelize.models);
      app.listen(SERVER_PORT, () => {
        devLogger.info(`Server listening at ${SERVER_PORT}`);
        checkConnection; // nodemailer
      });
    })
    .catch((error) => {
      devLogger.error('Connection failed', error);
      devLogger.warning('Retrying in 60 seconds... <maybe db down?>');
      return new Promise((resolve) => {
        setTimeout(resolve, 60000);
      }).then(() => connectWithRetry());
    });
};

connectWithRetry();



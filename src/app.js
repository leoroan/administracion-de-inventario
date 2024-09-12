import express from 'express';
import config from './config/configuration.js';
import configureExpress from './config/server/express.config.js';
import { sequelize } from './services/db/models/setup.db.js';
import { devLogger } from './config/logger/logger.config.js';
import { checkConnection } from './config/mail/nodemailer.config.js';

const app = express();
configureExpress(app);

const connectWithRetry = () => {
  return sequelize.authenticate()
    .then(() => {
      devLogger.info('Connection success');
      // return sequelize.sync({ force: true, alter: true });
      return sequelize.sync();
    })
    .then(() => {
      devLogger.info(`Models sincronized, Database connection on port: ${config.db.db_port}`);
      // console.log(sequelize.models)
      app.listen(config.port, () => {
        devLogger.info(`Server listening on port ${process.env.PORT} in ${config.environment}-mode `);
        checkConnection;
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



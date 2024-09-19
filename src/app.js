import express from 'express';
import config from './config/configuration.js';
import configureExpress from './config/server/express.config.js';
import { sequelize } from './services/db/models/setup.db.js';
import { devLogger } from './config/logger/logger.config.js';
import { checkConnection } from './config/mail/nodemailer.config.js';
import { afterSync } from './config/db/afterSync.db.js';

const app = express();
configureExpress(app);

const connectWithRetry = () => {
  return sequelize.authenticate()
    .then(() => {
      devLogger.info(`[DB-CONNECTION]: Success, on port: [${config.db.db_port}]`);
      // return sequelize.sync({ force: true, alter: true });
      return sequelize.sync();
    })
    .then(() => {
      devLogger.info(`[DB-MODELS]: Sincronized.`);
      afterSync();
      // console.log(sequelize.models)
      app.listen(process.env.PORT, () => {
        devLogger.info(`[SERVER]: Listening on port [${process.env.PORT}]`);
        checkConnection;
      });
    })
    .catch((error) => {
      devLogger.error('Unable to connect to the database:', error);
      devLogger.warning('Retrying in 60 seconds... <maybe db down?>');
      return new Promise((resolve) => {
        setTimeout(resolve, 60000);
      }).then(() => connectWithRetry());
    });
};

connectWithRetry();



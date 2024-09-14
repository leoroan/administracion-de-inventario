import express from 'express';
import config from './config/configuration.js';
import configureExpress from './config/server/express.config.js';
import { sequelize } from './services/db/models/setup.db.js';
import { devLogger } from './config/logger/logger.config.js';
import { checkConnection } from './config/mail/nodemailer.config.js';
import { createAdministrator } from './controllers/empleado.controller.js'

const app = express();
configureExpress(app);

const connectWithRetry = () => {
  return sequelize.authenticate()
    .then(() => {
      devLogger.info(`[DB-Connection]: Success, on port: [${config.db.db_port}]`);
      // return sequelize.sync({ force: true, alter: true });
      createAdministrator();
      return sequelize.sync();
    })
    .then(() => {
      devLogger.info(`[DB-Models]: Sincronized.`);
      // console.log(sequelize.models)
      app.listen(config.port, () => {
        devLogger.info(`[Server]: Listening on port [${process.env.PORT}]`);
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



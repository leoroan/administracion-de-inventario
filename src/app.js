import config from './config/configuration.js';
import express from 'express';
import configureExpress from './config/server/express.config.js';
import { createServer } from "http";
import { sequelize } from './config/db/sequelize.config.js';
import { devLogger } from './config/logger/logger.config.js';
import { socketManager } from './config/websocket/socket.js';
import { afterSync } from './db/afterSync.db.js';

const app = express();
const server = createServer(app);
configureExpress(app);
socketManager.init(server);

const docsUrl = process.env.ENV_MODE === 'DESARROLLO'
  ? `http://localhost:${process.env.PORT}/api-docs`
  : `${process.env.FRONTEND_ORIGIN}/api-docs`;

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    devLogger.info(`✅ [CONEXION DE LA BDD]: Conectada en puerto: \x1b[32m[${config.db.db_port}]\x1b[0m`);

    if (process.env.ENV_MODE === 'DESARROLLO' && process.env.DB_ERASE === "1") {
      await sequelize.drop();
      await sequelize.sync({ force: true });
      devLogger.info(`✅[ ⛔ BDD REINICIADA ⛔ ]: Reiniciada y sincronizada.`);
    } else {
      if (process.env.DB_ALTER === "1") {
        await sequelize.sync({ alter: true });
        devLogger.info(`✅ [BDD SINCRONIZADA CON ALTER]: Se ajustaron esquemas automáticamente.`);
      } else {
        await sequelize.sync();
        devLogger.info(`✅ [BDD SINCRONIZADA]: Sincronizada sin alterar estructura.`);
      }
    }
    afterSync();

    server.listen(process.env.PORT, () => {
      devLogger.info(`✅ [SERVIDOR Y WEBSOCKETS]: Escuchando en el puerto : \x1b[32m[${process.env.PORT}]\x1b[0m`);
    });
  } catch (error) {
    devLogger.error('Error conectando con la base de datos:', error);
    devLogger.warning('Reintentando en 60 segundos...');
    setTimeout(initializeDatabase, 60000);
  } finally {
    devLogger.info(`🅰️ 🅿️ ℹ️  Documentación de la API disponible en:\x1b[32m${docsUrl}\x1b[0m`);
  }
}

initializeDatabase();





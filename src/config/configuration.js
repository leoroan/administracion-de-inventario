/* eslint-disable no-undef */
import dotenv from 'dotenv';
import { devLogger } from './logger/logger.config.js';

// Cargar el archivo .env en la raíz del proyecto
dotenv.config();

if (
  !process.env.ENV_MODE || !process.env.BDD_MODE || !process.env.DB_HOST ||
  !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_DATABASE ||
  !process.env.DB_PORT || !process.env.PORT || !process.env.NODEMAILER_HOST ||
  !process.env.NODEMAILER_PORT || !process.env.NODEMAILER_USER || !process.env.NODEMAILER_PASS ||
  !process.env.MAILING_BASE_URL || !process.env.FRONTEND_ORIGIN
) {
  devLogger.error('Faltan variables de entorno necesarias O archivo ".env" en la raiz del sistema, comprobar y reintentar');
  process.exit(1);
}

// Registrar información de configuración
devLogger.info(`[MODE]: ${process.env.ENV_MODE}, [DB]: ${process.env.BDD_MODE}`);

process.on('exit', code => {
  console.log('Código de salida del proceso: ' + code);
});

process.on('uncaughtException', (error) => {
  console.error('Error no capturado:', error);
  console.error('Stack Trace:', error.stack);
  process.exit(1);
});

process.on('message', message => {
  console.log(`Mensaje recibido: ${message}`);
});

const environment = process.env.ENV_MODE;

export default {
  environment,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    db_port: process.env.DB_PORT,
  },
};

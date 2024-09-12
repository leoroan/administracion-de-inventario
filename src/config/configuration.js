/* eslint-disable no-undef */
import dotenv from 'dotenv';
import { Command } from 'commander';
import { devLogger } from './logger/logger.config.js';

// Cargar variables de entorno desde el archivo .env
// dotenv.config();
// // Comprobar si el archivo .env se encontró y no contiene errores
// if (!dotenv.loaded) {
//   console.error('Error al cargar el archivo .env');
//   process.exit(1);
// }

// Crear el objeto de configuración
const config = {
  // debug: false,
  // port: 8088,
  mode: 'local',
};
// Crear el objeto de comandos
const program = new Command();

// Definir las opciones
program
  // .option('-d, --debug', 'Activar modo debug', config.debug)
  // .option('-p, --port <port>', 'Puerto del servidor', config.port)
  .option('-m, --mode <mode>', 'Modo de trabajo', config.mode)
  .parse();

// Actualizar la configuración con los valores de las opciones
// config.debug = program.opts().debug;
// config.port = program.opts().port;
config.mode = program.opts().mode;

// Cargar el archivo .env específico del entorno
const dotenvPath = `./src/config/envs/.env.${config.mode}`;
dotenv.config({ path: dotenvPath });

// Comprobar si las variables de entorno necesarias están definidas
if (!process.env.ENV_TITLE || !process.env.BDD_MODE || !process.env.DB_HOST ||
  !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_DATABASE ||
  !process.env.DB_PORT || !process.env.PORT) {
  console.error('Faltan variables de entorno necesarias');
  process.exit(1);
}

// Registrar información de configuración
devLogger.warning(`>>>>> [Modo: ${process.env.ENV_TITLE}, Bdd: ${process.env.BDD_MODE}] <<<<<`);

process.on('exit', code => {
  console.log('Código de salida del proceso: ' + code)
})

process.on('uncaughtException', (error) => {
  console.error('Error no capturado:', error);
  console.error('Stack Trace:', error.stack);
  // Enviar un correo electrónico o notificación
  // sendEmailNotification(error);
  process.exit(1);
});

process.on('message', message => {
  console.log(`Mensaje recibido: ${message}`)
})

const port = process.env.PORT;
const environment = config.mode;

export default {
  port,
  environment,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    db_port: process.env.DB_PORT
  }
}
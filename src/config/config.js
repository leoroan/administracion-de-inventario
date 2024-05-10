import dotenv from 'dotenv';
import { Command } from 'commander';

// Cargar variables de entorno desde un archivo .env
dotenv.config();

// Crear instancia del programa Commander
const program = new Command();

// Definir opciones del programa
program
  .option('-d, --debug', 'Activar modo debug', false)
  .option('-p, --port <port>', 'Puerto del servidor', process.env.PORT || 8080)
  .option('--mode <mode>', 'Modo de trabajo', 'dev')
  .requiredOption('-u, --user <user>', 'Usuario que utilizará la aplicación', 'No se ha declarado un usuario.');

// Analizar los argumentos de la línea de comandos
program.parse();

// Manejar eventos del proceso
process.on("exit", code => {
  console.log("Código de salida del proceso: " + code);
});

process.on("uncaughtException", exception => {
  console.log(`Excepción no capturada: ${exception}`);
});

process.on("message", message => {
  console.log(`Mensaje recibido: ${message}`);
});

// Obtener las opciones del programa
const options = program.opts();
const environment = options.mode.toUpperCase();

// Configuración de las variables de entorno según el modo
dotenv.config({
  path: environment === "DEV" ? "./src/config/envs/.env.dev" : "./src/config/envs/.env.prod"
});

export default {
  port: options.port,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  environment: environment,
  debug: options.debug
};

import 'dotenv/config';
import { exec } from 'child_process';
import { devLogger } from './config/logger/logger.config.js';

// npm run update-models
const dbName = process.env.DB_DATABASE;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '3306';
const dbDialect = process.env.DB_DIALECT || 'mysql';

const command = `npx sequelize-auto -d ${dbName} -u ${dbUser} -p ${dbPort} -x ${dbPass} -h ${dbHost} -e ${dbDialect} -o "./src/db/models" -l esm --useDefine`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    devLogger.error(`Error ejecutando sequelize-auto: ${error.message}`);
    process.exit(1);
  }
  if (stderr) devLogger.error(`stderr: ${stderr}`);
  devLogger.debug(`stdout: ${stdout}`);
  devLogger.info('Modelos actualizados correctamente.');
});

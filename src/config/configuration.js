// import { devLogger } from './logger/logger.config.js';
// import dotenv from 'dotenv';

// dotenv.config();

// const requiredEnvVariables = [
// 'ENV_MODE',
// 'ADMIN_USER',
// 'ADMIN_PASS',
// 'ADMIN_EMAIL',
// 'ADMIN_ROLE',
// 'DB_DATABASE',
// 'BDD_MODE',
// 'DB_USER',
// 'DB_PASSWORD',
// 'DB_HOST',
// 'DB_PORT',
// 'DB_DIALECT',
// 'DB_ERASE',
// 'DB_ALTER',
// 'PORT',
// 'JWT_PRIVATE_KEY',
// 'JWT_EXPIRES_IN',
// 'SESSION_COOKIE_VTO',
// 'MAILING_BASE_URL',
// 'FRONTEND_ORIGIN',
// 'EMPRESA_NOMBRE',
// 'URL_SERV_MAIL'
// ];

// let missingVariables = [];

// requiredEnvVariables.forEach(variable => {
//   if (!process.env[variable]) {
//     missingVariables.push(variable);
//   }
// });

// if (missingVariables.length > 0) {
//   devLogger.error(`Faltan variables de entorno necesarias: ${missingVariables.join(', ')}. Comprobar archivo ".env" en la raíz del sistema y reintentar.`);
//   process.exit(1);
// } else {
//   devLogger.info('Todas las variables de entorno necesarias están presentes.');
// }

// devLogger.info(`[MODO]: ${process.env.ENV_MODE}, [MODO-BDD]: ${process.env.BDD_MODE}`);

// process.on('exit', code => {
//   devLogger.error('Código de salida del proceso: ' + code);
// });

// process.on('uncaughtException', (error) => {
//   devLogger.error('Error no capturado:', error);
//   devLogger.error('Stack Trace:', error.stack);
//   process.exit(1);
// });

// process.on('message', message => {
//   devLogger.info(`Mensaje recibido: ${message}`);
// });

// const environment = process.env.ENV_MODE;

// export default {
//   environment,
//   db: {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     db_port: process.env.DB_PORT,
//     db_dialect: process.env.DB_DIALECT
//   },
// };


import { devLogger } from './logger/logger.config.js'; 

import dotenv from 'dotenv';
dotenv.config();

const requiredEnvVariables = [
    'ENV_MODE',
    'ADMIN_USER',
    'ADMIN_PASS',
    'ADMIN_EMAIL',
    'ADMIN_ROLE',
    'DB_DATABASE',
    'BDD_MODE',
    'DB_USER',
    'DB_PASSWORD',
    'DB_HOST',
    'DB_PORT',
    'DB_DIALECT',
    'DB_ERASE',
    'DB_ALTER',
    'PORT',
    'JWT_PRIVATE_KEY',
    'JWT_EXPIRES_IN',
    'SESSION_COOKIE_VTO',
    'MAILING_BASE_URL',
    'FRONTEND_ORIGIN',
    'EMPRESA_NOMBRE',
    'URL_SERV_MAIL'
];

let missingVariables = [];

requiredEnvVariables.forEach(variable => {
    if (!process.env[variable]) {
        missingVariables.push(variable);
    }
});

if (missingVariables.length > 0) {
    devLogger.error(`❌ **ERROR CRÍTICO:** Faltan variables de entorno esenciales.`);
    devLogger.error(`Por favor, revisa tu archivo **.env** en la raíz del proyecto.`);
    devLogger.error(`Variables faltantes: **${missingVariables.join(', ')}**`);
    process.exit(1); 
} else {
    devLogger.info('✅ Todas las variables de entorno necesarias se cargaron correctamente.');
}

devLogger.info(`Configuración: **Modo ENV:** ${process.env.ENV_MODE} | **Modo BDD:** ${process.env.BDD_MODE}`);

process.on('exit', code => {
    if (code !== 0) {
        devLogger.error(`🚨 El proceso finalizó con código de salida: **${code}**.`);
    }
});

process.on('uncaughtException', (error) => {
    devLogger.error(`💥 **ERROR INESPERADO:** Se detectó una excepción no capturada.`);
    devLogger.error(`Detalle del error: ${error.message}`);
    if (error.stack) {
        devLogger.error(`Stack Trace: \n${error.stack}`);
    }
    process.exit(1); 
});

process.on('message', message => {
    devLogger.info(`✉️ Mensaje de proceso recibido: ${JSON.stringify(message)}`);
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
        db_dialect: process.env.DB_DIALECT,
        db_erase: process.env.DB_ERASE,
        db_alter: process.env.DB_ALTER
    },
    jwt: {
        privateKey: process.env.JWT_PRIVATE_KEY,
        expiresIn: process.env.JWT_EXPIRES_IN
    },
    session: {
        cookieVTO: process.env.SESSION_COOKIE_VTO
    },
    app: {
        port: process.env.PORT,
        mailingBaseUrl: process.env.MAILING_BASE_URL,
        frontendOrigin: process.env.FRONTEND_ORIGIN,
        companyName: process.env.EMPRESA_NOMBRE,
        mailServiceUrl: process.env.URL_SERV_MAIL
    },
    admin: {
        user: process.env.ADMIN_USER,
        pass: process.env.ADMIN_PASS,
        email: process.env.ADMIN_EMAIL,
        role: process.env.ADMIN_ROLE
    }
};
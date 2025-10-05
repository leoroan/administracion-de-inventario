import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { models } from '../../config/db/sequelize.config.js';
import { devLogger } from '../../config/logger/logger.config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const services = {};
let loaded = false;

const daosDir = resolve(__dirname, '../daos');
const servicesDir = resolve(__dirname, '../services');

const getBaseName = (filename, suffix) => filename.replace(suffix, '').toLowerCase();
const camelToPascal = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export async function loadServices() {
  if (loaded) return services;
  const daoFiles = fs.readdirSync(daosDir).filter(f => f.endsWith('.dao.js'));
  const serviceFiles = fs.readdirSync(servicesDir).filter(f => f.endsWith('.service.js'));

  for (const daoFile of daoFiles) {
    const base = getBaseName(daoFile, '.dao.js');
    const matchingServiceFile = serviceFiles.find(f => getBaseName(f, '.service.js') === base);
    if (!matchingServiceFile) continue;

    const { default: DAOClass } = await import(`../daos/${daoFile}`);
    const { default: ServiceClass } = await import(`../services/${matchingServiceFile}`);

    const modelName = camelToPascal(base);
    const model = models[modelName];

    if (!model) {
      devLogger.info(`⚠️ Modelo ${modelName} no encontrado. Saltando ${base}`);
      continue;
    }

    services[`${base}Service`] = new ServiceClass(new DAOClass(model));
  }

  // loaded = true;console.log('Servicios cargados:', Object.keys(services));
  
  return services;
}

export function getService(name) {
  if (!loaded) throw new Error(`Service ${name} requested before loadServices()`);
  return services[name];
}

export default services;
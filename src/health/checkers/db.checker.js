import { sequelize } from '../../config/db/sequelize.config.js';
import { createChecker } from '../baseChecker.js';

export default createChecker({
  name: 'db',
  description: 'Conexión a la base de datos (Sequelize)',
  critical: true,
  category: 'database',
  tags: ['sequelize', 'mysql'],
  cacheTTL: 5000,
  timeoutMs: 2000,
  async check() {
    try {
      await sequelize.authenticate();
      return {
        status: 'ok',
        message: 'DB conectada',
        details: { dialect: sequelize.getDialect() }, // 👈
        version: process.env.DB_VERSION ?? null       // 👈 opcional
      };
    } catch (err) {
      return {
        status: 'error',
        message: err.message,
        details: { stack: err.stack }
      };
    }
  }
});
import serviceInstances from '../../layers/services/servicesLoader.js';
import { createChecker } from '../baseChecker.js';

export default createChecker({
  name: 'usuarios',
  description: 'Chequear módulo usuarios (CRUD)',
  critical: true,
  category: 'core',
  tags: ['api', 'internal'],
  cacheTTL: 10_000,
  timeoutMs: 3000,
  async check() {
    try {
      const total = await serviceInstances.usuarioService.countRegisters();
      return {
        status: 'ok',
        message: `Usuarios: ${total}`,
        details: { total },
        version: "v1.0.0" 
      };
    } catch (err) {
      return { status: 'error', message: err.message };
    }
  }
});


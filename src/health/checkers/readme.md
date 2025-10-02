### Si tenés un módulo que depende de otros servicios:
_ejemplo_
```js
import { createChecker } from "../baseChecker.js";
import services from "../../layers/services/servicesLoader.js";

export default createChecker({
  name: "notificaciones",
  async check() {
    const results = {};

    // Chequeo propio
    try {
      const queued = await services.notificationService.countQueued();
      results.self = { status: "ok", message: `Cola: ${queued}` };
    } catch (err) {
      results.self = { status: "error", message: err.message };
    }

    // Chequeo sub-servicios
    results.subChecks = {
      sms: await services.smsService.checkStatus(),
      email: await services.emailService.checkStatus()
    };

    // Calculamos status global
    const status = Object.values(results).some(r => r.status === "error") ? "error" : "ok";

    return { status, message: "Notificaciones", checks: results };
  }
});
```
- results contiene tanto tu chequeo directo (self) como los sub-checkers (sms, email)
- _normalizeResult ya soporta checks, así el HealthService puede combinar todo.

## Beneficios

- Podés ver el estado de todo el stack de dependencias desde un solo endpoint (/api/healths/como-estas)
- Cada checker puede incluir otros checkers, y esos otros checkers pueden incluir aún más, hasta que tengas un árbol de chequeos
- Ideal para microservicios, módulos con sub-dependencias o integraciones externas
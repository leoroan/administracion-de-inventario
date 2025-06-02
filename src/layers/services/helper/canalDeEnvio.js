// envio/CanalDeEnvio.mjs
export class CanalDeEnvio {
  constructor(nombreCanal) {
    this.nombreCanal = nombreCanal;
  }

  async enviar(payload) {
    throw new Error(`Canal "${this.nombreCanal}" no implementa enviar()`);
  }

  // logEnvio(payload) {
  //   console.log(`[${this.nombreCanal}] Enviando mensaje a ${payload.to}`);
  // }

  // validarPayload(payload, camposObligatorios = []) {
  //   for (const campo of camposObligatorios) {
  //     if (!payload[campo]) {
  //       throw new Error(`[${this.nombreCanal}] Falta el campo obligatorio: ${campo}`);
  //     }
  //   }
  // }
}

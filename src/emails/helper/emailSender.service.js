import { BadRequest } from "../../config/error/errors.js";

const fromNameDefault = process.env.EMPRESA_NOMBRE || 'SERVICIO_INDEFINIDO';
const MSERV_KEY = process.env.KEY_MSERV_MAIL;

class EmailSender {
  constructor() {
    this.mailServiceUrl = process.env.URL_SERV_MAIL;
    if (!this.mailServiceUrl) {
      throw new Error('Variable de entorno no definida en el entorno');
    }
  }

  async enviar(to, subject, text = '', html = "<h1>empty!</h1>", fromName, attachments = []) {
    const body = { to, subject, text, html, fromName, attachments };
    const response = await fetch(`${this.mailServiceUrl}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-micro-service-key': MSERV_KEY,
        'x-service-name': fromNameDefault
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new BadRequest(`Fallo al enviar email: ${response.status} - ${errorText}`);
    }

    return response.json();
  }
}

export default new EmailSender();


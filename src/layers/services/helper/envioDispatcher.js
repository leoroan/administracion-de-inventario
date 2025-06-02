import EmailSender from '../EmailSender.service.js';

export function obtenerCanal(tipo) {
  switch (tipo) {
    case 'email':
      return new EmailSender();
    // case 'sms':
    //   return new SmsSender();
    default:
      throw new Error(`Canal de envío no soportado: ${tipo}`);
  }
}

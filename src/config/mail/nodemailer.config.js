import nodemailer from "nodemailer";
import { devLogger } from "../logs/logger.config.js";
const transporter = nodemailer.createTransport({
  host: 'mail.transporte.gba.gob.ar',
  port: 587,
  secure: false, // TLS requires secureConnection to be false
  tls: {
    rejectUnauthorized: false // Desactiva la verificación del certificado
  },
  auth: {
    user: 'no-responder@transporte.gba.gob.ar',
    pass: 'asd1234'
  }
});

const checkConnection = transporter.verify(function (error, success) {
  if (error) {
    devLogger.error("cannot stablish connection to mail server");
  } else {
    devLogger.debug('nodemailer ready to send');
  }
})

export { transporter, checkConnection };
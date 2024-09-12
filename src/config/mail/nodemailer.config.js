import nodemailer from "nodemailer";
import { devLogger } from "../logger/logger.config.js";

const transporter = nodemailer.createTransport({
  host: 'mail.transporte.gba.gob.ar',
  port: 587,
  secure: false, // TLS requires secureConnection to be false
  tls: {
    rejectUnauthorized: false // Desactiva la verificación del certificado
  },
  auth: {
    user: 'no-responder@transporte.gba.gob.ar',
    pass: 'MinTrpDevs20XX'
  },
  // logger: true, 
  // debug: true  
});

const checkConnection = transporter.verify(function (error) {
  if (error) {
    devLogger.warning("cannot establish connection to mail server: " + error.message);
  } else {
    devLogger.info('nodemailer ready to send');
  }
});

export { transporter, checkConnection };
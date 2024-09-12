import nodemailer from "nodemailer";
import { devLogger } from "../logger/logger.config.js";

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false, // TLS requires secureConnection to be false
  tls: {
    rejectUnauthorized: false // Desactiva la verificación del certificado
  },
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  },
  // logger: true, 
  // debug: true  
});

const checkConnection = transporter.verify(function (error) {
  if (error) {
    devLogger.warning("cannot establish connection to mail server: " + error.message);
  } else {
    devLogger.info(`nodemailer ready to send as "${process.env.NODEMAILER_USER}"`);
  }
});

export { transporter, checkConnection };
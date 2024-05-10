import nodemailer from "nodemailer";
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
    console.log(error);
    console.log("No se ha podido establecer la conexión con el servidor de correo");
  } else {
    console.log('El servicio está disponible para enviar correos..');
  }
})

export { transporter, checkConnection };
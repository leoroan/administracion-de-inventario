import fs from 'fs';
import path from "path";
import { createPDFDocument } from "../config/pdf/pdfConfig.js";
import { generateReportTemplate } from "../config/pdf/pdfTemplates.js";

export function generateAndDowloadPDF(req, res) {
  // Simulación de datos dinámicos de la API (deberían venir desde req.body, req.params, etc.)

  const docTitle = 'Asignacion de equipo';
  const docAuthor = req.user.username;
  const docSubject = 'Asignacion de equipo';

  const data1 = {
    nombre: 'Juan Perez',
    edad: 30,
    correo: 'juan.perez@example.com',
  };

  const data2 = {
    producto: 'Laptop',
    precio: 1200,
    cantidad: 2,
  };

  // Crear el documento PDF
  const doc = createPDFDocument(docTitle, docAuthor, docSubject);

  // Ruta donde se guardará el archivo temporalmente
  const outputDir = './output/';
  const filePath = path.join(outputDir, 'reporte.pdf');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Guardar el archivo PDF en el sistema de archivos
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Usar el template para generar el contenido
  generateReportTemplate(doc, data1, data2);

  // Enviar el PDF una vez generado
  stream.on('finish', () => {
    res.download(filePath, (err) => {
      if (err) {
        res.status(500).send('Error al generar el PDF');
      } else {
        // Opcional: eliminar el archivo después de enviarlo
        fs.unlinkSync(filePath);
      }
    });
  });
}


export async function sendPDFViaEmail(req, res) {
  // Simulación de datos dinámicos (deberían venir de req.body o req.params)
  const data1 = {
    nombre: 'Juan Perez',
    edad: 30,
    correo: 'juan.perez@example.com',
  };

  const data2 = {
    producto: 'Laptop',
    precio: 1200,
    cantidad: 2,
  };

  // Crear el documento PDF en memoria
  const doc = createPDFDocument();
  const buffers = [];

  // Almacena el PDF en memoria en lugar de un archivo
  doc.on('data', buffers.push.bind(buffers)); // Guarda cada chunk de datos
  doc.on('end', async () => {
    const pdfBuffer = Buffer.concat(buffers); // Combina los chunks en un solo buffer

    // Configurar Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // o cualquier otro servicio de email
      auth: {
        user: 'tu-email@gmail.com',
        pass: 'tu-contraseña',
      },
    });

    const mailOptions = {
      from: '"Nombre del Remitente" <tu-email@gmail.com>',
      to: 'destinatario@example.com',
      subject: 'Adjunto: Reporte PDF',
      text: 'Adjunto encontrarás el reporte en formato PDF.',
      attachments: [
        {
          filename: 'reporte.pdf',
          content: pdfBuffer, // El buffer generado por PDFKit
          contentType: 'application/pdf',
        },
      ],
    };

    try {
      // Enviar el correo con Nodemailer
      await transporter.sendMail(mailOptions);
      res.status(200).send('Correo enviado con éxito con el PDF adjunto.');
    } catch (error) {
      res.status(500).send('Error al enviar el correo.');
    }
  });

  // Generar el contenido del PDF usando el template
  generateReportTemplate(doc, data1, data2);
  doc.end(); // Finaliza la generación del PDF
}

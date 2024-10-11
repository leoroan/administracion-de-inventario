import fs from 'fs';
import path from "path";
import { devLogger } from '../config/logger/logger.config.js';
import { createPDFDocument } from "../config/pdf/pdfConfig.js";
import { generateRemitoTenenciaEmpleadoTemplate } from '../config/pdf/templates/remitoTenenciaEmpleado.template.js';
import { generateRemitoTenenciaOficinaTemplate } from '../config/pdf/templates/remitoTenenciaOficina.template.js';
import { empleadoService, equipoInformaticoService, oficinaService } from '../services/service.js';
import { sendPDFviaMail } from './mailer.controller.js';

export async function generarAsignacionEquipo(req, res, traza) {
  try {
    const { userId = null, oficinaId = null, equipoId = null } = req.query;
    const requester = req.user;
    const trazabilidad = traza.dataValues;

    const docTitle = 'Asignacion de equipo';
    const docSubject = 'Asignacion de equipo';
    const docAuthor = requester.username;

    const doc = createPDFDocument(docTitle, docAuthor, docSubject);

    const outputDir = './output/';
    const filePath = path.join(outputDir, 'reporte.pdf');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    const equipo = await equipoInformaticoService.findById(equipoId);

    if (userId) {
      const user = await empleadoService.findById(userId, 'conOficina');
      generateRemitoTenenciaEmpleadoTemplate(doc, equipo, user, trazabilidad, requester);

    } else if (oficinaId) {
      const oficina = await oficinaService.findById(oficinaId);
      generateRemitoTenenciaOficinaTemplate(doc, equipo, oficina, trazabilidad, requester);
    }

    stream.on('finish', () => {
      res.download(filePath, (err) => {
        if (err) {
          res.sendError('Error al generar el PDF');
        } else {
          fs.unlinkSync(filePath);
        }
      });
    });
  } catch (error) {
    devLogger.error(error)
    return res.sendError(error);
  }
}

// export function generateAndDowloadPDF(req, res) {

//   const docTitle = 'Asignacion de equipo';
//   const docAuthor = req.user.username;
//   const docSubject = 'Asignacion de equipo';

//   const data1 = {
//     nombre: 'Juan Perez',
//     edad: 30,
//     correo: 'juan.perez@example.com',
//   };

//   const data2 = {
//     producto: 'Laptop',
//     precio: 1200,
//     cantidad: 2,
//   };

//   // Crear el documento PDF
//   const doc = createPDFDocument(docTitle, docAuthor, docSubject);

//   // Ruta donde se guardará el archivo temporalmente
//   const outputDir = './output/';
//   const filePath = path.join(outputDir, 'reporte.pdf');

//   if (!fs.existsSync(outputDir)) {
//     fs.mkdirSync(outputDir);
//   }

//   // Guardar el archivo PDF en el sistema de archivos
//   const stream = fs.createWriteStream(filePath);
//   doc.pipe(stream);

//   // Usar el template para generar el contenido
//   generateReportTemplate(doc, data1, data2);

//   // Enviar el PDF una vez generado
//   stream.on('finish', () => {
//     res.download(filePath, (err) => {
//       if (err) {
//         res.status(500).send('Error al generar el PDF');
//       } else {
//         // Opcional: eliminar el archivo después de enviarlo
//         fs.unlinkSync(filePath);
//       }
//     });
//   });
// }


export async function sendPDFViaEmail(req, res, traza) {
  const { userId = null, oficinaId = null, equipoId = null } = req.query;
  const requester = req.user;
  const trazabilidad = traza.dataValues;

  const docTitle = 'Asignacion de equipo';
  const docSubject = 'Asignacion de equipo';
  const docAuthor = requester.username;

  try {
    // Crear el documento PDF en memoria
    const doc = createPDFDocument(docTitle, docAuthor, docSubject);
    const buffers = [];

    // Almacena el PDF en memoria en lugar de un archivo
    doc.on('data', buffers.push.bind(buffers)); // Guarda cada chunk de datos
    doc.on('end', async () => {
      const pdfBuffer = Buffer.concat(buffers); // Combina los chunks en un solo buffer
      sendPDFviaMail(req, res, pdfBuffer);
    });

    // Generar el contenido del PDF usando el template
    const equipo = await equipoInformaticoService.findById(equipoId);
    if (userId) {
      const user = await empleadoService.findById(userId, 'conOficina');
      generateRemitoTenenciaEmpleadoTemplate(doc, equipo, user, trazabilidad, requester);

    } else if (oficinaId) {
      const oficina = await oficinaService.findById(oficinaId);
      generateRemitoTenenciaOficinaTemplate(doc, equipo, oficina, trazabilidad, requester);
    }
  } catch (error) {
    devLogger.error(error)
    return res.sendError(error);
  }
}

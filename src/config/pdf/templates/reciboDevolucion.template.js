// /pdf/pdfTemplates.js

export function generateReciboDevolucionTemplate(doc, equipo, user, requester) {
  // Encabezado
  doc.fontSize(20).text('Asignacion de equipo', { align: 'center' }).moveDown(1);

  // Bloque de datos 1
  doc.fontSize(16).text('Datos 1:', 50, 100);
  doc.fontSize(12).text(`Nombre: ${data1.nombre}`, 50, 130);
  doc.text(`Edad: ${data1.edad}`, 50, 150);
  doc.text(`Correo: ${data1.correo}`, 50, 170);

  // Bloque de datos 2
  doc.fontSize(16).text('Datos 2:', 50, 220);
  doc.fontSize(12).text(`Producto: ${data2.producto}`, 50, 250);
  doc.text(`Precio: ${data2.precio}`, 50, 270);
  doc.text(`Cantidad: ${data2.cantidad}`, 50, 290);

  // Pie de página
  doc.text('Generado con PDFKit', 50, 700, { align: 'center' });

  // Finalizar el documento
  doc.end();
}

import PDFDocument from "pdfkit";

export function createPDFDocument() {
  const doc = new PDFDocument({
    margin: 50, // Establecer un margen predeterminado
    size: 'A4', // Tamaño del papel
    info: {
      Title: 'Reporte PDF',
      Author: 'Mi aplicación',
    },
  });

  return doc;
}

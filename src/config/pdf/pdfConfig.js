import PDFDocument from "pdfkit";

export function createPDFDocument(docTitle, docAuthor, docSubject) {
  const doc = new PDFDocument({
    margin: 50, // Establecer un margen predeterminado
    size: 'A4', // Tamaño del papel
    info: {
      Name: docTitle,
      Title: docTitle,
      Author: docAuthor,
      Subject: docSubject,
      Creator: 'InventarioMT',
      producer: 'InventarioMT',
    },
  });

  return doc;
}

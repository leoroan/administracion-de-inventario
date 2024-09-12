import PDFDocument from 'pdfkit';
import { addLogo } from './utils/logo.js';
import { addFooter } from './utils/footer.js';

const EncodeSansRegular = 'src/fonts/static/EncodeSans_Condensed-Regular.ttf';
const EncodeSansBold = 'src/fonts/static/EncodeSans_Condensed-Bold.ttf';

export const createPDFTemplate = (dataCallback, endCallback, data) => {
  const doc = new PDFDocument({
    size: 'A4',
    margins: {
      top: 25,
      right: 25,
      bottom: 0,
      left: 15,
    },
  });

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  const pageHeight = doc.page.height;
  const pageWidth = doc.page.width;
  const footerHeight = pageHeight * 0.06;
  const headerHeight = pageHeight * 0.18;
  const contentHeight = pageHeight - headerHeight - footerHeight;

  let posicionVertical = headerHeight;

  const addNewPage = () => {
    doc.addPage();
    addLogo(doc);
    posicionVertical = headerHeight;
  };

  const addContent = (text, options = {}, id) => {
    const { align = 'left', font = EncodeSansRegular, fontSize = 12, continued = false } = options;
  
    // Aplicar los estilos correctos antes de agregar el texto
    doc.fontSize(fontSize).font(font);
  
    // Calcular el alto del texto
    const textWidth = pageWidth - 100; // Ajusta según los márgenes deseados
    const textHeight = doc.heightOfString(text, { width: textWidth });
  
    // Verificar si el texto cabe en la página actual
    if (posicionVertical + textHeight > contentHeight) {
      // Añadir el pie de página y cambiar a una nueva página
      addFooter(doc, pageHeight, footerHeight, id);
      addNewPage();
      // Restablecer los estilos (opcionalmente puedes aplicar el estilo predeterminado aquí)
      doc.fontSize(fontSize).font(font);
    }
  
    // Agregar el texto a la página actual
    doc.text(text, 40, posicionVertical, { align, continued });
  
    // Actualizar la posición vertical para el siguiente contenido
    posicionVertical += textHeight;
  };

  // Agregar el logo en la primera página
  addLogo(doc);

  // Retorna el documento y la función addContent
  return {
    doc,
    addContent
  };
};

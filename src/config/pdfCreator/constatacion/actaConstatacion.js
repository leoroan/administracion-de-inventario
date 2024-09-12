import { createPDFTemplate } from '../createPDFTemplate.js';
import { buildConstatacionContent } from './buildConstatacionContent.js';
import { addFooter } from '../utils/footer.js';

export const buildConstatacionPDF = (dataCallback, endCallback, tipo, data) => {
  const { doc, addContent } = createPDFTemplate(dataCallback, endCallback, data);

  const content = buildConstatacionContent(data);

  content.forEach(item => {
    addContent(item.text, item.options);
  });

  // Agregar footer en la última página
  addFooter(doc,doc.page.height, doc.page.height * 0.15, data.ActaInspeccion.OrdenServicioId);

  // Finalizar y guardar el documento
  doc.end();
};

import { createPDFTemplate } from '../createPDFTemplate.js';
import { buildRequerimientoContent } from './buildRequerimientoContent.js';
import { addFooter } from '../utils/footer.js';

export const buildRequerimientoPDF = (dataCallback, endCallback, tipo, data) => {
  const { doc, addContent } = createPDFTemplate(dataCallback, endCallback, data);

  const content = buildRequerimientoContent(data);

  content.forEach(item => {
    addContent(item.text, item.options, data.OrdenServicio.id);
  });

  // Agregar footer en la última página
  addFooter(doc, doc.page.height, doc.page.height * 0.15, data.OrdenServicio.id);

  // Finalizar y guardar el documento
  doc.end();
};

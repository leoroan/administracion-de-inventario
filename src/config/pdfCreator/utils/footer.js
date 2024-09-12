export const addFooter = (doc, pageHeight, footerHeight, id) => {
  const footerY = pageHeight - footerHeight - 20; // Posición Y del footer desde el final de la página
  const pageWidth = doc.page.width;
  const margin = 50; // Margen izquierdo y derecho

  // Tamaño de fuente para el footer
  doc.fontSize(10);

  // Texto de firmas y aclaraciones
  const firmaTexto = 'Firma y aclaración Jefe de Planta';
  const fiscalizadorTexto = 'Firma y aclaración del Fiscalizador';

  // Medir el ancho del texto
  const firmaWidth = doc.widthOfString(firmaTexto);
  const fiscalizadorWidth = doc.widthOfString(fiscalizadorTexto);

  // Ajuste para mover el contenido hacia la derecha
  const offset = 20; // Ajusta este valor para mover los textos hacia la derecha

  // Calcular las posiciones X para centrar el texto en la misma fila
  const firmaX = margin + offset; // Ajusta el margen izquierdo
  const fiscalizadorX = pageWidth - fiscalizadorWidth - margin - offset; // Ajusta la posición del fiscalizador

  // Añadir línea horizontal para cada texto
  const lineY = footerY - 10; // Posición Y para la línea horizontal (ajustar según necesidad)

  // Línea para Firma y aclaración Jefe de Planta
  doc.moveTo(firmaX, lineY)
     .lineTo(firmaX + firmaWidth, lineY)
     .stroke();

  // Línea para Firma y aclaración del Fiscalizador
  doc.moveTo(fiscalizadorX, lineY)
     .lineTo(fiscalizadorX + fiscalizadorWidth, lineY)
     .stroke();

  // Agregar el texto de firmas y aclaraciones en la misma fila
  doc.text(firmaTexto, firmaX, footerY, { align: 'left' });
  doc.text(fiscalizadorTexto, fiscalizadorX, footerY, { align: 'left' });

  // Agregar un recuadro para el texto del footer
  const footerBoxY = footerY + 20;
  const footerBoxWidth = pageWidth - 2 * margin;
  const footerBoxHeight = 40; // Altura del recuadro (ajustar según necesidad)

  doc.rect(margin, footerBoxY, footerBoxWidth, footerBoxHeight)
     .stroke();

  doc.text(`La presente Acta de Inspección surge de la Orden de Servicio N° ${id} emanada de la Dirección Provincial de Verificación Técnica Vehicular documento GDEBA DTVTV`, margin, footerBoxY + 10, { width: footerBoxWidth, align: 'center' });
};

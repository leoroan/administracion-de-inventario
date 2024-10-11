// /pdf/pdfTemplates.js

import moment from "moment-timezone";

export function generateRemitoTenenciaEmpleadoTemplate(doc, equipo, user, trazabilidad, requester) {

  // Encabezado: RECIBO DE TENENCIA y Fecha
  const date = new Date();
  doc
    .fontSize(12)
    .text('RECIBO DE TENENCIA', { align: 'left' })
    .moveDown()
    .text(`FECHA ${moment(trazabilidad.createdAt).tz('America/Argentina/Buenos_Aires').format('DD/MM/YYYY')}`, { align: 'right' })
    .moveDown(2)

  // Título principal
  doc
    .fontSize(18)
    .text('MINISTERIO DE TRANSPORTE', { align: 'center' })
    .moveDown(1)
    .text('Gobierno de la Provincia de Buenos Aires', { align: 'center' })
    .moveDown(2);

  // Cuerpo del texto
  doc
    .fontSize(12)
    .text(`En el día de la fecha, yo, ${user.apellido}, ${user.nombre} he recibido del MINISTERIO DE TRANSPORTE de la Provincia de Buenos Aires el/los siguiente/s material/es para su uso exclusivo y excluyente en mis actividades laborales, comprometiéndome a utilizarlo/s estrictamente de acuerdo con el propósito indicado, y no para comunicaciones personales, ya que no es para beneficio personal. Asimismo, me comprometo a devolverlo/s a la primera solicitud o al término de mi relación jurídica con la misma.`,
      {
        align: 'justify',
        height: 100
      })
    .moveDown(2);

  // Detalles del equipo
  doc
    .fontSize(12)
    .text(`EQUIPO MT/ID: ${equipo?.mt ?? equipo?.id}`, { align: 'left' }).moveDown(0.5)
    .text(`MODELO: ${equipo.Modelo.dataValues.nombre}`).moveDown(0.5)
    .text(`MARCA: ${equipo.Modelo.Marca.nombre}`).moveDown(0.5)
    .text(`NUMERO DE SERIE: ${equipo.numeroDeSerie}`).moveDown(0.5)
    .text(`NUMERO DE PATRIMONIO: ${equipo.numeroDePatrimonio}`).moveDown(0.5)
    .moveDown(1);

  // Espacio para la firma
  doc
    .text(`SECTOR AL QUE PERTENECE: ${trazabilidad.nombreOficina}`, { align: 'left' })
    .moveDown(2)
    .text(`RESPONSABLE DE GENERAR EL PEDIDO/ENTREGAR: ${requester.username.toUpperCase()}`, { align: 'right' })
    .moveDown(2)
    .text(`TRAZA-CONTROL-NRO#: ${trazabilidad.id}`, { align: 'right' })
    .moveDown(2)
  // Finalizar el PDF
  doc.end();
}

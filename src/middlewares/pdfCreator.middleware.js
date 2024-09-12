import { buildConstatacionPDF } from "../config/pdfCreator/constatacion/actaConstatacion.js";
import { buildCalibracionPDF } from "../config/pdfCreator/calibracion/actaCalibracion.js";
import { buildRequerimientoPDF } from "../config/pdfCreator/requerimiento/actaRequerimiento.js";
import { buildDestruccionPDF } from "../config/pdfCreator/destruccion/actaDestruccion.js";
import { buildInspeccionPDF } from "../config/pdfCreator/inspeccion/actaInspeccion.js";
import { ActaCalibracion } from "../services/db/models/acta.calibracion.model.js";
import { ActaConstatacion } from "../services/db/models/acta.constatacion.model.js";
import { ActaDestruccionObleas } from "../services/db/models/acta.destruccion.model.js";
import { ActaInspeccion } from "../services/db/models/acta.inspeccion.model.js";
import { ActaRequerimiento } from "../services/db/models/acta.requerimiento.model.js";
import { OrdenServicio } from "../services/db/models/orden.servicio.model.js";
import { Oblea } from "../services/db/models/oblea.model.js";
import { Matafuegos } from "../services/db/models/matafuegos.model.js";
import { lineaDeInspeccion } from "../services/db/models/lineaDeInspeccion.model.js";
const models = {
  'calibracion': {
    model: ActaCalibracion,
    buildPDF: buildCalibracionPDF,
    query: (id) => ActaCalibracion.findByPk(id, { include: { model: OrdenServicio } }),
  },
  'constatacion': {
    model: ActaConstatacion,
    buildPDF: buildConstatacionPDF,
    query: (id) => ActaConstatacion.findByPk(id, { include: { model: ActaInspeccion, include: { model: OrdenServicio } } }),
  },
  'requerimiento': {
    model: ActaRequerimiento,
    buildPDF: buildRequerimientoPDF,
    query: (id) => ActaRequerimiento.findByPk(id, { include: { model: OrdenServicio } }),
  },
  'destruccion': {
    model: ActaDestruccionObleas,
    buildPDF: buildDestruccionPDF,
    query: (id) => ActaDestruccionObleas.findByPk(id, { include: [{ model: OrdenServicio }, { model: Oblea }] }),
  },
  'inspeccion': {
    model: ActaInspeccion,
    buildPDF: buildInspeccionPDF,
    query: (id) => ActaInspeccion.findByPk(id, { include: [{ model: OrdenServicio }, { model: Oblea }, { model: Matafuegos }, { model: lineaDeInspeccion }] }),
  },
  // Añadir más modelos y consultas aquí según sea necesario
};

export const generatePDF = () => {
  return async (req, res, next) => {
    try {
      const tipo = req.query.tipo?.toLowerCase();
      const id = req.params.id;

      if (!id || isNaN(Number(id))) {
        return res.status(400).send({ error: 'Invalid ID format' });
      }

      const { model: Model, buildPDF, query } = models[tipo] || {};

      if (!Model || !buildPDF || !query) {
        return res.status(400).send({ error: `Invalid model type: ${tipo}` });
      }

      const record = await query(id); // Usa la consulta específica para el tipo
      if (!record) {
        return res.status(404).send('Acta no encontrada');
      }

      const data = record.toJSON();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${tipo}-${id}.pdf`);

      buildPDF(
        (dataChunk) => res.write(dataChunk),
        () => res.end(),
        tipo,
        data
      );

    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send({ error: 'Internal Server Error' });
      next(error);
    }
  };
};

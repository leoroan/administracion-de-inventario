import { sqids } from '../config/sqids/sqids.js';

// tipo: 'DEN'|'REC'|'CON' (el tipo de solicitud)
// id: id de la solicitud
export function generarIdPublico(tipo, id) {
  const hoy = new Date();
  const fechaNum = parseInt(hoy.toISOString().slice(0, 10).replace(/-/g, ''), 10);
  const idCodificado = sqids.encode([id, fechaNum]);
  return `${tipo}${idCodificado}`;
}

export function decodificarIdPublico(idPublico) {
  const tipo = idPublico.slice(0, 3);
  const idCodificado = idPublico.slice(3);
  const numeros = sqids.decode(idCodificado);
  if (numeros.length !== 2) return null;
  const [id, fechaNum] = numeros;
  const fechaStr = fechaNum.toString();
  const fecha = new Date(`${fechaStr.slice(0, 4)}-${fechaStr.slice(4, 6)}-${fechaStr.slice(6, 8)}`);
  return { tipo, id, fecha };
}

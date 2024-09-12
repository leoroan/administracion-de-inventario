// buildConstatacionContent.js
const EncodeSansRegular = 'src/fonts/static/EncodeSans_Condensed-Regular.ttf';
const EncodeSansBold = 'src/fonts/static/EncodeSans_Condensed-Bold.ttf';

export const buildConstatacionContent = (data) => {
// Validar la fecha principal
console.log("Constatacion: ", data);

const fecha = data.fecha ? new Date(data.fecha) : new Date(0);
const fechaLocal = new Date(fecha.getTime() + fecha.getTimezoneOffset() * 60000);
const dia = fechaLocal.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();

// Validar la hora
const [hora, minutos] = data.hora ? data.hora.split(':') : ['00', '00'];

// Validar la fecha de inspección
const fechaInspeccion = data.ActaInspeccion && data.ActaInspeccion.fecha 
    ? new Date(data.ActaInspeccion.fecha) 
    : new Date(0);
const diaInspeccion = fechaInspeccion.getDate();
const mesInspeccion = fechaInspeccion.getMonth() + 1;
const anioInspeccion = fechaInspeccion.getFullYear();


    return [
        { text: 'ANEXO V', options: { align: 'right', font: EncodeSansBold } },
        { text: " " },
        { text: `Orden de Servicio: ${data.ActaInspeccion.OrdenServicioId || 'No se especificó'}`, options: { align: 'right' } },
        { text: " " },
        { text: `ACTA DE CONSTATACIÓN N° ${data.id || 'No se especificó'}`, options: { align: 'center', font: EncodeSansBold, fontSize: 16 } },
        { text: " " },
        { text: " " },
        { text: `En el día ${dia}/${mes}/${anio} siendo las ${hora}:${minutos} hs, se presenta el Sr/a ${data.ActaInspeccion.OrdenServicio.nombreUsuario || 'no se especificó'} en su carácter de agente fiscalizador/a de la Dirección Provincial de Verificación Técnica Vehicular, en la Planta Verificadora de ${data.ActaInspeccion.OrdenServicio.nombrePlanta || 'no se especificó'}, correspondiente a la Zona ${data.ActaInspeccion.OrdenServicio.zonaPlanta || 'no se especificó'} Estacion: ${data.ActaInspeccion.OrdenServicio.numeroEstacion || 'no se especificó'}, siendo atendido por personal autorizado a cargo, Sr/a ${data.nombrePersonaAutorizadaConcesionaria || 'no se especificó'}, de la empresa concesionaria ${data.nombreEmpresaConcesionaria || 'no se especificó'}.` },
        { text: `En cumplimiento con el Acta de Inspección N° ${data.ActaInspeccion.id || 'no se especificó'} relativa a la Orden de Servicio N° ${data.ActaInspeccion.OrdenServicioId || 'No se especificó'} llevada a cabo el día ${diaInspeccion}/${mesInspeccion}/${anioInspeccion} y en atención al incumplimiento registrado, se procede a documentar las siguientes observaciones:` },
        { text: " "},
        { text: " Observaciones: " },
        { text: " "},
        { text: `   ${data.observacion || 'Sin observaciones.'}` },
        { text: " " },
        { text: `Asimismo, se deja constancia que, en caso de corresponder, se intima a la concesionaria para que en el plazo de ${data.plazoIntimacion || 'no se especificó'} días hábiles contados a partir del día siguiente de la notificación, conforme lo prescribe la "Ley de Procedimiento Administrativo" (Decreto Ley 7647/70), proceda a regularizar las obligaciones incumplidas mencionadas, TODO ELLO bajo apercibimiento de aplicar las sanciones establecidas en el artículo 22 del Anexo Único del Decreto N° 2103/22 y demás normativa aplicable.` }
    ];
};

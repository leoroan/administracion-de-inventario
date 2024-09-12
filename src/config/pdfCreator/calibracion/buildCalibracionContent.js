const EncodeSansRegular = 'src/fonts/static/EncodeSans_Condensed-Regular.ttf';
const EncodeSansBold = 'src/fonts/static/EncodeSans_Condensed-Bold.ttf';

export const buildCalibracionContent = (data) => {
    console.log(data);
    
// Validar y procesar la fecha
let dia, mes, anio;
if (data.fecha) {
    const fecha = new Date(data.fecha);
    const fechaLocal = new Date(fecha.getTime() + fecha.getTimezoneOffset() * 60000);
    dia = fechaLocal.getDate();
    mes = fecha.getMonth() + 1;
    anio = fecha.getFullYear();
} else {
    dia = mes = anio = 0; // Valores predeterminados si no hay fecha
}

// Validar y procesar la hora
let hora, minutos;
if (data.hora) {
    [hora, minutos] = data.hora.split(':');
} else {
    hora = minutos = '00'; // Valores predeterminados si no hay hora
}

    
    

    return [
        { text: 'ANEXO VI', options: { align: 'right', font: EncodeSansBold } },
        { text: " " },
        { text: `Orden de Servicio: ${data.OrdenServicioId || 'No se especificó'}`, options: { align: 'right' } },
        { text: " " },
        { text: `ACTA DE CALIBRACIÓN DE EQUIPOS N° ${data.id || 'No se especificó'}`, options: { align: 'center', font: EncodeSansBold, fontSize: 16 } },
        { text: " " },
        { text: " " },
        { text: `En el día ${dia}/${mes}/${anio} siendo las ${hora}:${minutos} hs, se presenta el Sr/a ${data.OrdenServicio.nombreUsuario || 'no se especificó'} en su carácter de agente fiscalizador/a de la Dirección Provincial de Verificación Técnica Vehicular, en la Planta Verificadora de ${data.OrdenServicio.nombrePlanta || 'no se especificó'}, correspondiente a la Zona ${data.OrdenServicio.zonaPlanta || 'no se especificó'} Estacion: ${data.OrdenServicio.numeroEstacion || 'no se especificó'}, siendo atendido por personal autorizado a cargo, Sr/a ${data.nombrePersonaAutorizadaConcesionaria || 'no se especificó'}, de la empresa concesionaria ${data.nombreEmpresaConcesionaria || 'no se especificó'}, con el objetivo de presenciar la calibración de todos los equipos de medición de la Planta. Se deja constancia de dicha prueba en los equipos.` },
        { text: " " },
        { text: "Observaciones:", options: { font: EncodeSansBold } },
        { text: " " },
        { text: data.observacionCalibracion || 'Sin observaciones.' },
    ];

};

const EncodeSansBold = 'src/fonts/static/EncodeSans_Condensed-Bold.ttf';

export const buildDestruccionContent = (data) => {
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


    // Inicializar el contenido
    const content = [
        { text: 'ANEXO VII', options: { align: 'right', font: EncodeSansBold } },
        { text: " " },
        { text: `Orden de Servicio: ${data.OrdenServicioId || 'No se especificó'}`, options: { align: 'right' } },
        { text: " " },
        { text: `ACTA DE DESTRUCCIÓN N° ${data.id || 'No se especificó'}`, options: { align: 'center', font: EncodeSansBold, fontSize: 16 } },
        { text: " " },
        { text: " " },
        { text: `En el día ${dia} / ${mes} / ${anio} siendo las ${hora} : ${minutos} hs, se presenta el Sr/a ${data.OrdenServicio.nombreUsuario || 'no se especificó'} en su carácter de agente fiscalizador/a de la Dirección Provincial de Verificación Técnica Vehicular, en la Planta Verificadora de ${data.OrdenServicio.nombrePlanta || 'no se especificó'}, correspondiente a la Zona ${data.OrdenServicio.zonaPlanta || 'no se especificó'} Estacion: ${data.OrdenServicio.numeroEstacion || 'no se especificó'}, siendo atendido por personal autorizado a cargo, Sr/a ${data.nombrePersonaAutorizada || 'no se especificó'}, de la empresa concesionaria ${data.nombreEmpresa || 'no se especificó'}` },
        { text: `con el objetivo de constatar en este acto la efectiva destrucción de obleas, cuya numeración se detalla a continuación: ` }
    ];

    // Agregar información de cada oblea
    data.Obleas.forEach((oblea, index) => {
        content.push({ text: `Oblea ${index + 1}:`, options: { font: EncodeSansBold } });
        content.push({ text: `Año de Oblea: ${oblea.anio}`})
        content.push({ text: `Número Inicial: ${oblea.numeroInicial}` });
        content.push({ text: `Número Final: ${oblea.numeroFinal}` });
        content.push({ text: `Tipo de Bulto: ${oblea.tipoBulto}` });
        content.push({ text: " " });
    });

    // Agregar observaciones al final
    content.push({ text: "Observaciones:", options: { font: EncodeSansBold } });
    content.push({ text: data.observacion || 'Sin observaciones.', options: { indent: 20 } });

    return content;
};

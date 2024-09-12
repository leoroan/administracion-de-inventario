const EncodeSansBold = 'src/fonts/static/EncodeSans_Condensed-Bold.ttf';

export const buildRequerimientoContent = (data) => {
    const formatearFecha = (fecha) => {
        const [year, month, day] = fecha.toISOString().slice(0, 10).split('-');
        return `${day}/${month}/${year}`;
    };

    // Datos del acta
    const fecha = new Date(data.fecha);
    const fechaLocal = new Date(fecha.getTime() + fecha.getTimezoneOffset() * 60000);
    const dia = fechaLocal.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    // Usar la hora recibida
    const [hora, minutos] = data.hora.split(':');

    return [
        { text: 'ANEXO IV', options: { align: 'right', font: EncodeSansBold } },
        { text: " " },
        { text: `Orden de Servicio: ${data.OrdenServicioId || 'No se especificó'}`, options: { align: 'right' } },
        { text: " " },
        { text: `ACTA DE REQUERIMIENTO N° ${data.id || 'No se especificó'}`, options: { align: 'center', font: EncodeSansBold, fontSize: 16 } },
        { text: " " },
        { text: " " },
        { text: `En el día ${dia}/${mes}/${anio} siendo las ${hora}:${minutos} hs, se presenta el Sr/a ${data.OrdenServicio.nombreUsuario || 'no se especificó'} en su carácter de agente fiscalizador/a de la Dirección Provincial de Verificación Técnica Vehicular, en la Planta Verificadora de ${data.OrdenServicio.nombrePlanta || 'no se especificó'}, correspondiente a la Zona ${data.OrdenServicio.zonaPlanta || 'no se especificó'} Estación: ${data.OrdenServicio.numeroEstacion || 'no se especificó'}, siendo atendido por personal autorizado a cargo, Sr/a ${data.nombrePersonaAutorizada || 'no se especificó'}, de la Empresa Concesionaria ${data.nombreEmpresa || 'no se especificó'}.` },
        { text: " " },
        { text: `Para verificar el cumplimiento de la normativa vigente que rige la concesión de la prestación del servicio de Verificación Técnica Vehicular, se requiere:` },
        { text: `1- Poner a disposición Libros IVA compras y ventas períodos ${formatearFecha(data.libroIvaDesde)} a ${formatearFecha(data.libroIvaHasta)} y la documentación respaldatoria.` },
        { text: `2- Poner a disposición libros societarios y de comercio (Libro Diario, Inventarios y balances, Actas de Asamblea).` },
        { text: " " },
        { text: `La totalidad de la documentación aportada deberá estar suscrita por el titular o persona debidamente autorizada, conteniendo aclaración de firma y carácter invocado. Asimismo, se deja constancia que la concesionaria posee un plazo de ${data.plazoCumplimiento || 'no se especificó'} días hábiles contados a partir del día siguiente de la presente notificación para cumplir con el requerimiento.` }
    ];
};

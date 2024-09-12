const EncodeSansRegular = 'src/fonts/static/EncodeSans_Condensed-Regular.ttf';
const EncodeSansBold = 'src/fonts/static/EncodeSans_Condensed-Bold.ttf';

export const buildInspeccionContent = (data) => {
    function convertirFecha(fechaString) {
        const fecha = new Date(fechaString);
        const fechaLocal = new Date(fecha.getTime() + fecha.getTimezoneOffset() * 60000);
        return {
            dia: fechaLocal.getDate(),
            mes: fechaLocal.getMonth() + 1,
            anio: fechaLocal.getFullYear()
        };
    }
    
    // Datos del acta
    const { dia, mes, anio } = convertirFecha(data.fecha);
    
    // Próxima calibración
    const { dia: diaProxCalibracion, mes: mesProxiaCalibracion, anio: anioProxCalibracion } = convertirFecha(data.proximaCalibracion);
    
    // Anterior calibración
    const { dia: diaOperativoAnterior, mes: mesOperativoAnterior, anio: anioOperativoAnterior } = convertirFecha(data.fechaOperativoAnterior);
    

    // Transformar booleano a SI o NO
    const transformBooleanToText = (value) => {
        if (value == null) {
       return 'No hay datos';
        }
        return value ? 'Si' : 'No';
    };

    // Usar la hora recibida
    const [hora, minutos] = data.hora.split(':');

    // Inicializar el contenido
    const content = [];

    content.push({ text: 'ANEXO III', options: { align: 'right', font: EncodeSansBold } });
    content.push({ text: " " });
    content.push({ text: `Orden de Servicio: ${data.OrdenServicioId || 'No se especificó'}`, options: { align: 'right' } });
    content.push({ text: " " });
    content.push({ text: `ACTA DE INSPECCIÓN N° ${data.id || 'No se especificó'}`, options: { align: 'center', font: EncodeSansBold, fontSize: 16 } });
    content.push({ text: " " });
    content.push({ text: " " });
    content.push({ text: `En el día ${dia} / ${mes} / ${anio} siendo las ${hora} : ${minutos} hs, se presenta el Sr/a ${data.OrdenServicio.nombreUsuario || 'no se especificó'} en su carácter de agente fiscalizador/a de la Dirección Provincial de Verificación Técnica Vehicular, en la Planta Verificadora de ${data.OrdenServicio.nombrePlanta || 'no se especificó'}, correspondiente a la Zona ${data.OrdenServicio.zonaPlanta || 'no se especificó'} Estacion: ${data.OrdenServicio.numeroEstacion || 'no se especificó'}, siendo atendido por personal autorizado a cargo, Sr/a ${data.nombrePersonaAutorizada || 'no se especificó'}, de la empresa concesionaria ${data.nombreEmpresa || 'no se especificó'}, con el objetivo de auditar técnica y administrativamente la misma.`});
    content.push({ text: `Ubicacion: ${data.ubicacion || 'no se especificó'}`});
    content.push({ text: " "});
    content.push({ text: `OBSERVACIONES DE INSPECCIÓN:`, options: { font: EncodeSansBold, indent: 30 } });
    content.push({ text: " "});
    content.push({ text: `1.- ¿Se han recibido quejas u otros comentarios desde la última inspección?    ${transformBooleanToText(data.tieneQuejas)}`});
    content.push({ text: `2.- ¿Se encuentra el Jefe, Sub Jefe o responsable de la planta?    ${transformBooleanToText(data.tieneJefe)}`});
    content.push({ text: `3.- ¿Hubo cambios con respecto al personal?    ${transformBooleanToText(data.HuboCambiosDelPersonal)}`});
    content.push({ text: `4.- ¿Todo el personal posee uniforme completo?    ${transformBooleanToText(data.poseeUniformeTodoElPersonal)}`});
    content.push({ text: `5.- ¿El personal tiene tarjetas de identificación visible?    ${transformBooleanToText(data.tieneElPersonalIdentificacionVisible)}`});
    content.push({ text: `6.- Control de firmas de informes técnicos:    ${data.nombreControlFirma}`});
    content.push({ text: `7.- ¿Encuesta al usuario?    ${transformBooleanToText(data.hacenEncuestas)}`});
    content.push({ text: `8.- ¿Certificado de calibración de equipos?    ${transformBooleanToText(data.poseeCertificadoDeCalibracion)}`});
    content.push({ text: `9.- Próxima calibración:   ${diaProxCalibracion} /${mesProxiaCalibracion} / ${anioProxCalibracion}`});
    content.push({ text: `10.- ¿Libro o carpeta de mantenimiento de equipos?    ${transformBooleanToText(data.poseeLibroDeMantenimientoDeEquipos)}`});
    content.push({ text: `11.- Observaciones y cumplimientos: ${data.observaciones || 'Sin observaciones'}`});

    // Agregar la sección de matafuegos
    content.push({ text:  `12.- Cantidad de matafuegos: ${data.Matafuegos.length} `});

    data.Matafuegos.forEach((matafuego, index) => {
        content.push({ text: `Matafuego ${index + 1}:` });
        content.push({ text: `Código: ${matafuego.codigo}`});

        const fechaVencimiento = new Date(matafuego.fechaVencimiento);
        const diaVencimiento = fechaVencimiento.getDate();
        const mesVencimiento = fechaVencimiento.getMonth() + 1;
        const anioVencimiento = fechaVencimiento.getFullYear();

        content.push({ text: `Fecha de Vencimiento: ${diaVencimiento} / ${mesVencimiento} / ${anioVencimiento}`});
        content.push({ text: " " });
    });

    content.push({ text: " " });

    // Continuar con el resto del contenido
    content.push({ text: `13.- Averías y tiempo de reparación: ${data.observacionesAverias}`});
    content.push({ text: `14.- ¿La planta cuenta con Grupo Electrógeno?    ${transformBooleanToText(data.tieneGrupoEletrogeno)}`});
    content.push({ text: `15.- Limpieza de la planta: ${data.estadoLimpiezaPlanta}`});
    content.push({ text: `16.- Limpieza general de equipos y fosas: ${data.estadoLimpiezaEquipos}`});
    content.push({ text: `17.- Señalización del predio: ${data.senalizacionDelPredio}`});
    content.push({ text: `18.- ¿Logos y colores correctos?   ${transformBooleanToText(data.logosYcoloresCorrectos)}`});
    content.push({ text: `19.- Conexión de líneas al Software   ${transformBooleanToText(data.poseeConexionDeLineasAlSoftware)}`});
    content.push({ text: `20.- ¿Se lleva un registro de obleas?    ${transformBooleanToText(data.seLlevaRegistroObleas)}`});
    content.push({ text: "21.- Inventario de Obleas:"});
    
    data.Obleas.forEach((oblea, index) => {
        content.push({ text: `Oblea ${index + 1}:` });
        content.push({ text: `Año: ${oblea.anio}`});
        content.push({ text: `Número Inicial: ${oblea.numeroInicial}`});
        content.push({ text: `Número Final: ${oblea.numeroFinal}`});
        content.push({ text: `Tipo de Bulto: ${oblea.tipoBulto}`});
        content.push({ text: " " });
    });
    
    content.push({ text: " " });
    content.push({ text: `22.- ¿Se encuentra disponible el Libro de Quejas?    ${transformBooleanToText(data.libroDeQuejasVisible)}`});
    content.push({ text: `23.- ¿A la vista?    ${transformBooleanToText(data.libroDeQuejasVisible)}`});
    content.push({ text: `24.- Número de Folio: ${data.numeroFolio}`});
    content.push({ text: `25.- ¿Carteles indicando el Libro de Quejas y Manual del Usuario?    ${transformBooleanToText(data.hayCartelLibroDeQuejas)}`});
    content.push({ text: `26.- Tiempo de permanencia del usuario: ${data.tiempoEsperaPromedioUsuario}`});
    content.push({ text: `27.- Fecha del operativo anterior   ${diaOperativoAnterior} /${mesOperativoAnterior} / ${anioOperativoAnterior}`});
    content.push({ text: `28.- ¿Se impementaron mejoras en la planta desde la última inspección?    ${transformBooleanToText(data.huboMejorasDesdeUltimaInspeccion)}`});
    content.push({ text: `29.- ¿Planilla Producción mes anterior?    ${transformBooleanToText(data.existePlanillaProduccion)}`});
    content.push({ text: `30.- ¿Planilla Inventario de Obleas?    ${transformBooleanToText(data.existePlanillaInventarioObleas)}`});
    content.push({ text: `31.- ¿Planilla de listado de personal?    ${transformBooleanToText(data.existePlanillaListadoPersonal)}`});
    content.push({ text: `32.- ¿Planilla de facturación del día anterior?   ${transformBooleanToText(data.existePlanillaFacturacionDiaAnterior)}`});
    content.push({ text: `33.- ¿La planta posee plano de evacuación?    ${transformBooleanToText(data.existePlanoEvacuacion)}`});
    content.push({ text: `34.- ¿La planta posee salidas de emergencia?    ${transformBooleanToText(data.existeSalidasEmergencia)}`});
    content.push({ text: `35.- ¿La planta posee sanitarios para discapacitados?    ${transformBooleanToText(data.existeSanitariosDiscapacitados)}`});
    content.push({ text: `36.- ¿La planta posee sistema de extracción de humos?    ${transformBooleanToText(data.existeSistemaExtraccionHumos)}`});
    content.push({ text: `37.- ¿El ingreso y egreso a la planta está en condiciones?    ${transformBooleanToText(data.estaEnCondicionesIngresoEgreso)}`});
    content.push({ text: `38.- ¿La planta posee red contra incendios?    ${transformBooleanToText(data.existeRedContraIncendios)}`});
    content.push({ text: " " });
    content.push({ text: `OBSERVACIONES DE INSPECCIÓN: `});
    content.push({ text: `${data.comentariosInspeccion || 'Sin observaciones'}`});
    content.push({ text: " " });

    data.lineaDeInspeccions.forEach((linea, index) => {
        const lineaNumber = index + 1;
        

        content.push({ text: `Equipos de Control de Planta (Línea ${lineaNumber}):`});

        
        content.push({ text: `Analizador gases: ${linea.analizadorGases}`});
        content.push({ text: `Opacímetro: ${linea.opacimetro}`});
        content.push({ text: `Regloscopio: ${linea.regloscopio}`});
        content.push({ text: `Sonómetro: ${linea.sonometro}`});
        content.push({ text: `Frenómetro: ${linea.frenometro}`});
        content.push({ text: `Banco de Amortiguadores: ${linea.bancoAmortiguadores}`});
        content.push({ text: `Alineador al Paso: ${linea.alineadorPaso}`});
        content.push({ text: `Detector de Holguras: ${linea.detectorHolguras}`});
        content.push({ text: " " });
        

        content.push({ text: " " });
    });

    return content;
};

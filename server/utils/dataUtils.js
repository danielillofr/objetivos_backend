Respuesta_error_generico = (mensaje) => {
    return ({
        ok: false,
        errBaseDatos: false,
        err: mensaje
    })
}

Respuesta_error_base = (err) => {
    if (!err.errBaseDatos) {
        console.log(err);
        return (Respuesta_error_generico('Error inesperado'));
    }
    return ({
        ok: false,
        errBaseDatos: err.errBaseDatos,
        err: err.err
    })
}

Calcular_porcentajes_dias = (objetivos, incidencias) => {
    let diasTotales = 0;
    let diasProyecto = 0;
    let diasIncidencias = 0;
    let diasAusencias = 0;
    let porcentajeConseguido = 0;
    let diasAnual = 261;
    let dateFechaFin = new Date();
    dateFechaFin.setTime(Date.parse('2018-1-1'));
    incidencias.forEach(element => {
        if (element.ausencia) {
            diasAusencias += element.dias;
        }else{
            diasIncidencias += element.dias;
        }
    })
    diasAnual -= diasAusencias;
    objetivos.forEach(element => {
        diasTotales += element.diasLaborables;
        // diasProyecto += element.diasProyecto;
        let porcentajeObjetivo = (element.diasProyecto / diasAnual);
        porcentajeObjetivo = (porcentajeObjetivo * element.conseguido);
        porcentajeConseguido += porcentajeObjetivo;
        if (element.fechaFin > dateFechaFin) {
            dateFechaFin = element.fechaFin;
        }
    });
    diasTotales -= diasAusencias;
    diasProyecto = diasTotales - diasIncidencias;

    let porcentajeTotales = (diasTotales / diasAnual) * 1000;
    porcentajeTotales = Math.round(porcentajeTotales);
    porcentajeTotales = porcentajeTotales / 10;
    porcentajeConseguido = porcentajeConseguido * 10;
    porcentajeConseguido = Math.round(porcentajeConseguido);
    porcentajeConseguido = porcentajeConseguido / 10;

    let porcentajeProyecto = (diasProyecto / diasAnual) * 1000;
    porcentajeProyecto = Math.round(porcentajeProyecto);
    porcentajeProyecto = porcentajeProyecto / 10;

    let porcentajeProVsTot = (diasProyecto / diasTotales) * 1000;
    porcentajeProVsTot = Math.round(porcentajeProVsTot);
    porcentajeProVsTot = porcentajeProVsTot / 10;

    let porcentajeIncidencias = (diasIncidencias / diasAnual) * 1000;
    porcentajeIncidencias = Math.round(porcentajeIncidencias);
    porcentajeIncidencias = porcentajeIncidencias / 10;

    let porcentajeIncVsTot = (diasIncidencias / diasTotales) * 1000;
    porcentajeIncVsTot = Math.round(porcentajeIncVsTot);
    porcentajeIncVsTot = porcentajeIncVsTot / 10;

    return {
        totales: {
            dias: diasTotales,
            porcentaje: porcentajeTotales,
            diasAnual
        },
        proyecto: {
            dias: diasProyecto,
            porcentaje: porcentajeProyecto,
            vsTotal: porcentajeProVsTot
        },
        incidencias: {
            dias: diasIncidencias,
            diasAusencias,
            porcentaje: porcentajeIncidencias,
            vsTotal: porcentajeIncVsTot
        },
        fechaPlan: dateFechaFin,
        porcentajeConseguido
    }

}

Calcular_porcentaje_planificado = (objetivos) => {
    let porcentaje = 0;
    let dias = 0;
    objetivos.forEach(element => {
        porcentaje += element.porcentaje;
        dias += element.diasLaborables;
    });
    return { porcentaje, laborables };
}

Calcular_porcentaje_conseguido = (objetivos) => {
    let porcentajeConseguido = 0;
    objetivos.forEach(element => {
        const porcentaje = element.porcentaje;
        const conseguido = element.conseguido / 100;
        porcentajeConseguido += (porcentaje * conseguido);
    })
    return porcentajeConseguido;
}

Calcular_porcentaje_incidencias = (incidencias, laborables) => {
    let dias = 0;
    incidencias.forEach(element => {
        dias += element.dias;
    })
    let porcentaje = (dias / laborables) * 100;
    return { dias, porcentaje };

}

module.exports = { Respuesta_error_generico, Respuesta_error_base, Calcular_porcentaje_planificado, Calcular_porcentaje_conseguido, Calcular_porcentaje_incidencias, Calcular_porcentajes_dias }
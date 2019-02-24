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
    let porcentajeConseguido = 0;
    let dateFechaFin = new Date();
    dateFechaFin.setTime(Date.parse('2018-1-1'));
    objetivos.forEach(element => {
        diasTotales += element.diasLaborables;
        diasProyecto += element.diasProyecto;
        let porcentajeObjetivo = (element.diasProyecto / 261);
        porcentajeObjetivo = (porcentajeObjetivo * element.conseguido);
        porcentajeConseguido += porcentajeObjetivo;
        if (element.fechaFin > dateFechaFin) {
            dateFechaFin = element.fechaFin;
        }
    });
    incidencias.forEach(element => {
        diasIncidencias += element.dias;
    })

    let porcentajeTotales = (diasTotales / 261) * 1000;
    porcentajeTotales = Math.round(porcentajeTotales);
    porcentajeTotales = porcentajeTotales / 10;
    porcentajeConseguido = porcentajeConseguido * 10;
    porcentajeConseguido = Math.round(porcentajeConseguido);
    porcentajeConseguido = porcentajeConseguido / 10;

    let porcentajeProyecto = (diasProyecto / 261) * 1000;
    porcentajeProyecto = Math.round(porcentajeProyecto);
    porcentajeProyecto = porcentajeProyecto / 10;

    let porcentajeProVsTot = (diasProyecto / diasTotales) * 100;

    let porcentajeIncidencias = (diasIncidencias / 261) * 1000;
    porcentajeIncidencias = Math.round(porcentajeIncidencias);
    porcentajeIncidencias = porcentajeIncidencias / 10;

    let porcentajeIncVsTot = (diasIncidencias / diasTotales) * 100;

    return {
        totales: {
            dias: diasTotales,
            porcentaje: porcentajeTotales
        },
        proyecto: {
            dias: diasProyecto,
            porcentaje: porcentajeProyecto,
            vsTotal: porcentajeProVsTot
        },
        incidencias: {
            dias: diasIncidencias,
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
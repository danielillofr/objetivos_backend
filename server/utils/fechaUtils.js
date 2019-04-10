Obtener_dias_laborables = (fechaInicio, fechaFin) => {
    fechaInicioDate = new Date();
    fechaFinDate = new Date();
    fechaInicioDate.setTime(Date.parse(fechaInicio));
    fechaFinDate.setTime(Date.parse(fechaFin));
    const tiempoFin = fechaFinDate.getTime();
    let tiempoActual = fechaInicioDate.getTime();
    fechaActualDate = fechaInicioDate;
    let diasLaborables = 1;

    while (tiempoActual < tiempoFin) {
        diasLaborables++;
        tiempoActual += (24 * 3600 * 1000);
        fechaActualDate.setTime(tiempoActual);
        if ((fechaActualDate.getDay() == 0) || (fechaActualDate.getDay() == 6)) {
            diasLaborables--;
        }
    }
    return diasLaborables;
}

Anadir_dias_laborables = (objetivo, dias) => {
    fechaFinDate = objetivo.fechaFin;
    fechaFin = fechaFinDate.getTime();
    for (let i = 0; i < dias; i++) {
        do {
            fechaFin += 24 * 3600 * 1000;
            fechaFinDate.setTime(fechaFin);
        } while ((fechaFinDate.getDay() == 0) || (fechaFinDate.getDay() == 6));
    }
    objetivo.fechaFin = fechaFinDate;
    objetivo.diasLaborables = Number(objetivo.diasLaborables) + Number(dias);
    return objetivo;
}

module.exports = { Obtener_dias_laborables };
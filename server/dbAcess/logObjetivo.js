const LogObjetivo = require('./../models/logObjetivo');

Anadir_log = (usuario, incidencia, objetivo) => {
    let fechaLog = new Date();
    let logObjetivo = new LogObjetivo({
        usuario: objetivo.usuario,
        nombreUsuario: usuario.nombre,
        objetivo: objetivo._id,
        dias: incidencia.dias,
        motivo: incidencia.motivo,
        fechaFin: objetivo.fechaFin,
        diasLaborables: objetivo.diasLaborables,
        diasProyecto: objetivo.diasProyecto,
        fechaLog
    });
    return new Promise((resolve, reject) => {
        logObjetivo.save((err, logObjetivoDB) => {
            if (err) {
                reject({
                    errBaseDatos: true,
                    err
                })
            }
            resolve({
                ok: true,
                logObjetivo: logObjetivoDB
            })
        })
    })
}

Log_por_objetivo = (idObjetivo) => {
    return new Promise((resolve, reject) => {
        LogObjetivo.find({ objetivo: idObjetivo }, (err, logs) => {
            if (err) {
                reject({
                    errBaseDatos: true,
                    err
                })
            }
            resolve(logs);
        })
    })
}

module.exports = { Anadir_log, Log_por_objetivo }
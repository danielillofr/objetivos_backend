const LogObjetivo = require('./../models/logObjetivo');

Anadir_log = (usuario, incidencia) => {
    let logObjetivo = new LogObjetivo({
        usuario: usuario._id,
        nombreUsuario: usuario.nombre,
        objetivo: incidencia.objetivo,
        dias: incidencia.dias,
        motivo: incidencia.motivo
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

module.exports = { Anadir_log }
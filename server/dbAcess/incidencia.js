const Incidencia = require('./../models/incidencia');
const objetivo2Access = require('./objetivo2')
const logObjetivoAccess = require('./logObjetivo')
const _ = require('underscore');

Nueva_incidencia = async(usuario, datosIncidencia) => {
    let incidencia = await Crear_incidencia(datosIncidencia);
    let objetivo = await objetivo2Access.Anadir_dias_a_objetivo(datosIncidencia.objetivo, datosIncidencia.dias);
    let log = await logObjetivoAccess.Anadir_log(usuario, datosIncidencia, objetivo);
    return incidencia;
}

Crear_incidencia = (datosIncidencia) => {
    return new Promise((resolve, reject) => {

        let incidencia = new Incidencia({
            objetivo: datosIncidencia.objetivo,
            dias: datosIncidencia.dias,
            motivo: datosIncidencia.motivo
        });
        incidencia.save((err, incidenciaDB) => {
            if (err) {
                reject({
                    errBaseDatos: true,
                    err
                })
            }
            resolve(incidenciaDB);
        })
    })
}

Obtener_todas_incidencias = () => {
    return new Promise((resolve, reject) => {
        Incidencia.find({}, (err, incidenciasDB) => {
            if (err) {
                reject({
                    errBaseDatos: true,
                    err
                })
            }
            resolve(incidenciasDB);
        })
    })
}

Obtener_incidencias_por_objetivo = (idObjetivo) => {
    return new Promise((resolve, reject) => {
        Incidencia.find({ objetivo: idObjetivo }, (err, incidenciasDB) => {
            if (err) {
                reject({
                    errBaseDatos: true,
                    err
                })
            }
            resolve(incidenciasDB);
        })
    })
}


module.exports = { Nueva_incidencia, Obtener_todas_incidencias, Obtener_incidencias_por_objetivo }
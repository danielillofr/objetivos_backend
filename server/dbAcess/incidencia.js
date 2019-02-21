const Incidencia = require('./../models/incidencia');
const objetivoAccess = require('./objetivo')
const logObjetivoAccess = require('./logObjetivo')
const _ = require('underscore');

Nueva_incidencia = async(usuario, datosIncidencia) => {
    let incidencia = await Crear_incidencia(datosIncidencia); //Creamos la incidencia
    let objetivo = await objetivoAccess.Anadir_dias_a_objetivo(datosIncidencia.objetivo, datosIncidencia.dias); //Añadimos los días al proyecto
    let log = await logObjetivoAccess.Anadir_log(usuario, datosIncidencia, objetivo); //Y añadimos al log
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
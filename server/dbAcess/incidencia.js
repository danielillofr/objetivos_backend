const Objetivo = require('./../models/objetivo');
const Incidencia = require('./../models/incidencia');
const _ = require('underscore');

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

module.exports = { Crear_incidencia, Obtener_todas_incidencias }
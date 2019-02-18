const Incidencia = require('./../models/incidencia')
const objetivoAccess = require('./../dbAcess/objetivo')
const incidenciaAccess = require('./../dbAcess/incidencia')
const dataUtils = require('./../utils/dataUtils')
const express = require('express');
const app = express();
const _ = require('underscore');

const fechaUtils = require('./../utils/fechaUtils')

const { Autentificar } = require('./../middlewares/Autentificar');

app.post('/api/incidencias', Autentificar, (req, res) => {
    const body = req.body;
    if ((!body.objetivo) || (!body.dias) || (!body.motivo)) {
        return res.json(dataUtils.Respuesta_error_generico('Objetivo, dias y motivo requeridos'));
    }
    incidenciaAccess.Crear_incidencia(body)
        .then(incidencia => {
            res.json({
                ok: true,
                incidencia
            })
        })
        .catch(err => {
            res.json(dataUtils.Respuesta_error_base(err));
        })
})

app.get('/api/incidencias', Autentificar, (req, res) => {
    incidenciaAccess.Obtener_todas_incidencias()
        .then(incidencias => {
            res.json({
                ok: true,
                incidencias
            })
        })
        .catch(err => {
            res.json(dataUtils.Respuesta_error_base(err));
        })
})

module.exports = app;
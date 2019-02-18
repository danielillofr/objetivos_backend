const Objetivo = require('./../models/objetivo');
const objetivoAccess = require('./../dbAcess/objetivo')
const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const _ = require('underscore');

const fechaUtils = require('./../utils/fechaUtils')

const { Autentificar, AutentificarAdmin, AutentificarAdminOUser } = require('./../middlewares/Autentificar');

app.get('/api/objetivos', Autentificar, (req, res) => {
    objetivoAccess.Obtener_todos_objetivos()
        .then(objetivos => {
            res.json({
                ok: true,
                objetivos
            })
        })
        .catch(err => {
            res.json({
                ok: false,
                errBaseDatos: err.errBaseDatos,
                err: err.err
            })
        })
})

app.get('/api/objetivos/:idUsuario', (req, res) => {
    objetivoAccess.Obtener_objetivos_usuario(req.params.idUsuario)
        .then(objetivos => {
            res.json({
                ok: true,
                objetivos
            })
        })
        .catch(err => {
            res.json({
                ok: false,
                errBaseDatos: err.errBaseDatos,
                err: err.err
            })
        })
});

app.post('/api/objetivos', Autentificar, (req, res) => {
    const body = req.body;
    if ((!body.nombre) || (!body.usuario) || (!body.fechaInicio) || (!body.fechaFin)) {
        return res.json({
            ok: false,
            errBaseDatos: false,
            err: 'Nombre, usuario, fecha inicio y fecha fin requeridos'
        })
    }
    objetivoAccess.Crear_objetivo(body)
        .then(objetivo => {
            res.json({
                ok: true,
                objetivo: objetivo
            })
        })
        .catch(err => {
            res.json({
                ok: false,
                errBaseDatos: err.errBaseDatos,
                err: err.err
            })
        })
})

module.exports = app;
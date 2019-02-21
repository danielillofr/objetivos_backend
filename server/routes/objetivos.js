const Objetivo = require('./../models/objetivo');
const objetivo2Access = require('./../dbAcess/objetivo2')
const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const _ = require('underscore');

const fechaUtils = require('./../utils/fechaUtils')

const dataUtils = require('./../utils/dataUtils')

const { Autentificar, AutentificarAdmin, AutentificarAdminOUser } = require('./../middlewares/Autentificar');

//Obtener todos los objetivos
app.get('/api/objetivos', Autentificar, (req, res) => {
    objetivo2Access.Obtener_todos_objetivos()
        .then(objetivos => {
            res.json({
                ok: true,
                objetivos
            })
        })
        .catch(err => {
            res.json(dataUtils.Respuesta_error_base(err));
        })
})

app.get('/api/objetivos/completo/:idObjetivo', Autentificar, (req, res) => {
    objetivo2Access.Obtener_objetivo_completo(req.params.idObjetivo)
        .then(objetivoCompleto => {
            res.json({
                ok: true,
                objetivoCompleto
            })
        })
        .catch(err => res.json(dataUtils.Respuesta_error_base(err)));
})

//Obtener todos los objetivos por usuario
app.get('/api/objetivos/:idUsuario', (req, res) => {
    objetivo2Access.Obtener_objetivos_usuario(req.params.idUsuario)
        .then(objetivos => {
            res.json({
                ok: true,
                objetivos
            })
        })
        .catch(err => {
            res.json(dataUtils.Respuesta_error_base(err));
        })
});

//Crear un objetivo
app.post('/api/objetivos', Autentificar, (req, res) => {
    const body = req.body;
    if ((!body.nombre) || (!body.usuario) || (!body.fechaInicio) || (!body.fechaFin)) {
        return res.json(dataUtils.Respuesta_error_generico('Nombre, usuario, fecha inicio y fecha fin requeridos'));
    }
    objetivo2Access.Nuevo_objetivo(req.usuario, body)
        .then(objetivo => {
            res.json({
                ok: true,
                objetivo: objetivo
            })
        })
        .catch(err => {
            res.json(dataUtils.Respuesta_error_base(err));
        })
})

//Cerrar cierra el objetivo. Se ha terminado el proyecto antes. Se respeta el porcentaje del objetivo

app.post('/api/objetivos/cerrar/:idObjetivo', Autentificar, (req, res) => {
    objetivo2Access.Cerrar_objetivo(req.params.idObjetivo, 0)
        .then(resultado => {
            console.log('Resultado', resultado);
            res.json({
                ok: true,
                resultado
            })
        })
        .catch(err => {
            console.log('Error:', err)
                // res.send('Va');
        })
})

//Cancelar proyecto, se ha cerrado sin terminar, se reajusta el porcentaje

app.post('/api/objetivos/cancelar/:idObjetivo', Autentificar, (req, res) => {
    objetivo2Access.Cerrar_objetivo(req.params.idObjetivo, 1)
        .then(resultado => {
            console.log('Resultado', resultado);
            res.json({
                ok: true,
                resultado
            })
        })
        .catch(err => {
            console.log('Error:', err)
                // res.send('Va');
        })
});

app.put('/api/objetivos/:idObjetivo', Autentificar, (req, res) => {
    let body = req.body;
    body = _.pick(body, ['conseguido']);
    objetivo2Access.Modificar_objetivo(req.params.idObjetivo, body)
        .then(objetivo => {
            res.json({
                ok: true,
                objetivo
            })
        })
        .catch(err => {
            res.json(dataUtils.Respuesta_error_base(err));
        })
})

module.exports = app;
const Usuario = require('./../models/usuario');
const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const _ = require('underscore');

const { Autentificar, AutentificarAdmin, AutentificarAdminOUser } = require('./../middlewares/Autentificar');

//Obtener un listado con todos los usuarios. Solo administrador

app.get('/api/usuarios', Autentificar, function(req, res) {
    Usuario.find({}, (err, usuariosDB) => {
        if (err) {
            return res.status(200).json({
                ok: false,
                errBaseDatos: true,
                err
            })
        }
        res.status(200).json({
            ok: true,
            usuarios: usuariosDB
        })
    })
})

app.get('/api/usuarios/:idAprobador', Autentificar, function(req, res) {
    Usuario.find({ aprobador: req.params.idAprobador }, (err, usuariosDB) => {
        if (err) {
            return res.status(200).json({
                ok: false,
                errBaseDatos: true,
                err
            })
        }
        res.status(200).json({
            ok: true,
            usuarios: usuariosDB
        })
    })
})

//Creacion de un nuevo usuario

app.post('/api/usuarios', (req, res) => {
    let body = req.body;
    if ((!body.nombre) || (!body.clave) || (!body.nombreCompleto)) {
        return res.status(200).json({
            ok: false,
            errBaseDatos: false,
            err: 'Nombre, clave y nombre completo requeridos'
        })
    }
    let usuario = new Usuario({
        nombre: body.nombre,
        nombreCompleto: body.nombreCompleto,
        clave: bcrypt.hashSync(body.clave, 10),
        role: body.role,
        aprobador: body.aprobador
    })
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(200).json({
                ok: false,
                errBaseDatos: true,
                err
            })
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        });
    });
})

//Login
app.post('/api/usuarios/login', (req, res) => {
    let body = req.body;
    if ((!body.nombre) || (!body.clave)) { //Aseguramos que esté el usuario y la clave en el body
        return res.status(200).json({
            ok: false,
            errBaseDatos: false,
            err: 'Nombre y clave requeridos'
        })
    }
    Usuario.findOne({ nombre: body.nombre }, (err, usuarioDB) => {
        if (err) { //Error al leer en la base de datos
            return res.status(200).json({
                ok: false,
                errBaseDatos: true,
                err
            })
        }
        if (!usuarioDB) { //Usuario no existe
            return res.status(200).json({
                ok: false,
                errBaseDatos: false,
                err: 'Usuario no existe'
            })
        }
        if (!(bcrypt.compareSync(body.clave, usuarioDB.clave))) {
            return res.status(200).json({ //Contraseña incorrecta
                ok: false,
                errBaseDatos: false,
                err: 'Clave incorrecta'
            })
        }
        // Creamos el token y lo devolvemos
        let token = jwt.sign({
            usuario: usuarioDB
        }, 'ClaveSecreta', { expiresIn: 3600 * 24 * 30 });
        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token
        })
    })
})

//Eliminar un usuario. Esto solo lo puede hacer el Administrador

app.delete('/api/usuarios/:id', [Autentificar, AutentificarAdmin], (req, res) => {
    let params = req.params;
    if (!params.id) {
        return res.status(200).json({
            ok: false,
            errBaseDatos: false,
            err: 'Debe indicar el id del usuario'
        })
    }
    Usuario.findByIdAndRemove(params.id, (err, usuarioDB) => {
        if (err) { //Error al leer en la base de datos
            return res.status(200).json({
                ok: false,
                errBaseDatos: true,
                err
            })
        }
        if (!usuarioDB) { //Error al leer en la base de datos
            return res.status(200).json({
                ok: false,
                errBaseDatos: false,
                err: 'No hay usuario con ese ID en la base de datos'
            })
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

//Actualizar usuario
app.put('/api/usuarios/:id', [Autentificar, AutentificarAdminOUser], (req, res) => {
    let body = req.body;
    let id = req.params.id;
    body = _.pick(body, ['nombre', 'nombreCompleto']);
    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(200).json({
                ok: false,
                errBaseDatos: true,
                err
            })
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

module.exports = app;
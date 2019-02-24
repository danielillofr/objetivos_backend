const Usuario = require('./../models/usuario');

Obtener_datos_usuario = (idUsuario) => {
    return new Promise((resolve, reject) => {
        Usuario.findById(idUsuario, (err, usuarioDB) => {
            if (err) {
                reject({
                    errBaseDatos: true,
                    err
                })
            }
            resolve(usuarioDB);
        })
    })
}

module.exports = { Obtener_datos_usuario }
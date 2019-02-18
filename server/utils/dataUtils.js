Respuesta_error_generico = (mensaje) => {
    return ({
        ok: false,
        errBaseDatos: false,
        err: mensaje
    })
}

Respuesta_error_base = (err) => {
    return ({
        ok: false,
        errBaseDatos: err.errBaseDatos,
        err: err.err
    })
}

module.exports = { Respuesta_error_generico, Respuesta_error_base }
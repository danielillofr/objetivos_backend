Respuesta_error_generico = (mensaje) => {
    return ({
        ok: false,
        errBaseDatos: false,
        err: mensaje
    })
}

Respuesta_error_base = (err) => {
    if (!err.errBaseDatos) {
        console.log(err);
        return (Respuesta_error_generico('Error inesperado'));
    }
    return ({
        ok: false,
        errBaseDatos: err.errBaseDatos,
        err: err.err
    })
}

Calcular_porcentaje_planificado = (objetivos) => {
    let porcentaje = 0;
    objetivos.forEach(element => {
        porcentaje += element.porcentaje;
    });
    return porcentaje;
}

Calcular_porcentaje_conseguido = (objetivos) => {
    let porcentajeConseguido = 0;
    objetivos.forEach(element => {
        const porcentaje = element.porcentaje;
        const conseguido = element.conseguido / 100;
        porcentajeConseguido += (porcentaje * conseguido);
    })
    return porcentajeConseguido;
}

module.exports = { Respuesta_error_generico, Respuesta_error_base, Calcular_porcentaje_planificado, Calcular_porcentaje_conseguido }
const Objetivo = require('./../models/objetivo');
const _ = require('underscore');
const fechaUtils = require('./../utils/fechaUtils')

Obtener_todos_objetivos = () => {
    return new Promise((resolve, reject) => {
        Objetivo.find({}, (err, objetivosDB) => {
            if (err) {
                reject({
                    errBaseDatos: true,
                    err
                })
            }
            resolve(objetivosDB);
        })
    })
}

Obtener_objetivos_usuario = (idUsuario) => {
    return new Promise((resolve, reject) => {
        Objetivo.find({ usuario: idUsuario }, (err, objetivosDB) => {
            if (err) {
                reject({
                    errBaseDatos: true,
                    err
                })
            }
            resolve(objetivosDB);
        })
    })
}

Crear_objetivo = (datosObjetivo) => {
    return new Promise((resolve, reject) => {
        const diasLaborables = fechaUtils.Obtener_dias_laborables(datosObjetivo.fechaInicio, datosObjetivo.fechaFin);
        const objetivo = new Objetivo({
            usuario: datosObjetivo.usuario,
            nombre: datosObjetivo.nombre,
            fechaInicio: Date.parse(datosObjetivo.fechaInicio),
            fechaFin: Date.parse(datosObjetivo.fechaFin),
            conseguido: datosObjetivo.conseguido,
            diasLaborables
        });
        objetivo.save((err, objetivoDB) => {
            if (err) {
                reject({
                    errBaseDatos: true,
                    err
                });
            }
            resolve(objetivoDB);
        })
    })
}

Obtener_objetivo = (id) => {
    return new Promise((resolve, reject) => {
        Objetivo.findById(id, (err, objetivoDB) => {
            if (err) {
                reject({
                    errBaseDatos: true,
                    err
                });
            }
            resolve(objetivoDB);
        })
    })
}

Modificar_objetivo = (id, objetivo) => {
    return new Promise((resolve, reject) => {
        Objetivo.findByIdAndUpdate(id, objetivo, { new: true }, (err, objetivoDB) => {
            if (err) {
                reject({
                    errBaseDatos: true,
                    err
                });
            }
            resolve(objetivoDB);
        })

    })
}

Anadir_dias_a_objetivo = async(id, dias) => {
    objetivo = await Obtener_objetivo(id);
    objetivo = Anadir_dias_laborables(objetivo, dias);
    objetivo = _.pick(objetivo, ['fechaFin', 'diasLaborables']);
    return await Modificar_objetivo(id, objetivo);

}

module.exports = { Crear_objetivo, Obtener_todos_objetivos, Obtener_objetivos_usuario }
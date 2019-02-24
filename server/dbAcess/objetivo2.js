const Objetivo = require('./../models/objetivo');
const incidenciaAccess = require('./incidencia')
const _ = require('underscore');
const fechaUtils = require('./../utils/fechaUtils')
const logObjetivoAccess = require('./logObjetivo')
const dataUtils = require('./../utils/dataUtils')
const usuarioAccess = require('./usuario')

module.exports.Anadir_dias_a_objetivo = async(id, dias) => {
    objetivo = await Obtener_objetivo(id);
    objetivo = Anadir_dias_laborables(objetivo, dias);
    objetivo = _.pick(objetivo, ['fechaFin', 'diasLaborables']);
    return await Modificar_objetivo(id, objetivo);
}

module.exports.Obtener_todos_objetivos = () => {
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

module.exports.Obtener_datos_usuario = async(idUsuario) => {
    const objetivos = await Obtener_objetivos_usuario(idUsuario);
    const usuario = await usuarioAccess.Obtener_datos_usuario(idUsuario);
    const incidencias = await incidenciaAccess.Obtener_incidencias_por_usuario(idUsuario);
    // const objetivo_planificado = dataUtils.Calcular_porcentaje_planificado(objetivos);
    // const objetivo_conseguido = dataUtils.Calcular_porcentaje_conseguido(objetivos);
    // const datos_incidencias = dataUtils.Calcular_porcentaje_incidencias(incidencias, objetivo_planificado.laborables);
    const datos = dataUtils.Calcular_porcentajes_dias(objetivos, incidencias);

    return {
        usuario,
        objetivos,
        incidencias,
        datos
    }
}


Crear_objetivo = (datosObjetivo) => {
    return new Promise((resolve, reject) => {
        const diasLaborables = fechaUtils.Obtener_dias_laborables(datosObjetivo.fechaInicio, datosObjetivo.fechaFin);
        // let porcentaje = Number(diasLaborables);
        // porcentaje = porcentaje / 261;
        // porcentaje = porcentaje * 1000;
        // porcentaje = Math.round(porcentaje);
        // porcentaje = porcentaje / 10;
        const objetivo = new Objetivo({
            usuario: datosObjetivo.usuario,
            nombre: datosObjetivo.nombre,
            fechaInicio: Date.parse(datosObjetivo.fechaInicio),
            fechaFin: Date.parse(datosObjetivo.fechaFin),
            conseguido: datosObjetivo.conseguido,
            diasLaborables,
            diasProyecto: diasLaborables
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

module.exports.Nuevo_objetivo = async(usuario, datosObjetivo) => {
    let objetivo = await Crear_objetivo(datosObjetivo);
    await logObjetivoAccess.Anadir_log(usuario, { dias: 0, motivo: 'Se crea el objetivo' }, objetivo);
    return objetivo;

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
            if (!objetivoDB) {
                reject({
                    errBaseDatos: false,
                    err: 'No hay objetivo con ese ID'
                })
            }
            console.log('Objetivo conseguido:', objetivoDB);
            resolve(objetivoDB);
        })
    })
}

module.exports.Obtener_objetivo_completo = async(id) => {
    let objetivo = await Obtener_objetivo(id);
    let incidencias = await incidenciaAccess.Obtener_incidencias_por_objetivo(id);
    let logs = await logObjetivoAccess.Log_por_objetivo(id);
    return {
        objetivo,
        incidencias,
        logs
    }
}

module.exports.Modificar_objetivo = Modificar_objetivo = (id, objetivo) => {
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

module.exports.Cerrar_objetivo = async(id, reajustarPorcentaje) => {
    objetivo = await Obtener_objetivo(id);
    objetivo.fechaFin = new Date();
    objetivo.diasLaborables = objetivo.diasProyecto = fechaUtils.Obtener_dias_laborables(objetivo.fechaInicio, objetivo.fechaFin);

    console.log('Antes de reajustar');
    // if (reajustarPorcentaje) {
    //     let porcentaje = Number(objetivo.diasLaborables);
    //     porcentaje = porcentaje / 261;
    //     porcentaje = porcentaje * 1000;
    //     porcentaje = Math.round(porcentaje);
    //     porcentaje = porcentaje / 10;
    //     objetivo.porcentaje = porcentaje;
    // }
    console.log('Despues de reajustar');
    objetivo = _.pick(objetivo, ['fechaFin', 'diasLaborables', 'porcentaje']);
    return await Modificar_objetivo(id, objetivo);
}
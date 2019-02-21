const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logObjetivoSchema = new Schema({
    objetivo: {
        type: Schema.Types.ObjectId,
        ref: 'Objetivo',
        required: [true, 'El objetivo es requerido']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es requerido']
    },
    nombreUsuario: {
        type: String,
        default: ''
    },
    dias: {
        type: Number,
        default: 0
    },
    motivo: {
        type: String,
        default: ''
    },
    fechaFin: {
        type: Date,
        default: '1/1/1'
    },
    diasLaborables: {
        type: Number,
        default: 0
    },
    fechaLog: {
        type: Date,
        required: [true, 'La fecha del log es requerida']
    }

});

module.exports = mongoose.model('LogObjetivo', logObjetivoSchema)
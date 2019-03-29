const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const incidenciaSchema = new Schema({
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
    dias: {
        type: Number,
        required: [true, 'Los días son requeridos']
    },
    motivo: {
        type: String,
        required: [true, 'El motivo es requerio']
    },
    ausencia: {
        type: Boolean,
        default: false
    }
});

incidenciaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

module.exports = mongoose.model('Incidencia', incidenciaSchema)
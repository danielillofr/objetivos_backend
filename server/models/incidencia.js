const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const incidenciaSchema = new Schema({
    objetivo: {
        type: Schema.Types.ObjectId,
        ref: 'Objetivo',
        required: [true, 'El objetivo es requerido']
    },
    dias: {
        type: Number,
        required: [true, 'Los días son requeridos']
    },
    motivo: {
        type: String,
        required: [true, 'El motivo es requerio']
    }
});

incidenciaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

module.exports = mongoose.model('Incidencia', incidenciaSchema)
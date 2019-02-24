const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const objetivoSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es requerido']
    },
    nombre: {
        type: String,
        require: [true, 'El nombre es requerido']
    },
    fechaInicio: {
        type: Date,
        require: [true, 'El nombre es requerido']
    },
    fechaFin: {
        type: Date,
        require: [true, 'El nombre es requerido']
    },
    conseguido: {
        type: Number,
        default: 0
    },
    diasLaborables: {
        type: Number,
        default: 0
    },
    diasProyecto: {
        type: Number,
        default: 0
    }
});

objetivoSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.clave;
    return userObject;
}

objetivoSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

module.exports = mongoose.model('Objetivo', objetivoSchema)
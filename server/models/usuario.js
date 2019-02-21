const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['DIRECTOR', 'COORDINADOR', 'INGENIERO'],
    message: '{VALUE} no es un estado válido para el role'
}


const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    nombreCompleto: {
        type: String,
        required: [true, 'El nombre completo es obligatorio']
    },
    clave: {
        type: String,
        required: [true, 'La clave es obligatoria']
    },
    email: {
        type: String,
        require: [true, 'El email es obligatorio']
    },
    role: {
        type: String,
        default: 'INGENIERO',
        enum: rolesValidos
    },
    aprobador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.clave;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

module.exports = mongoose.model('Usuario', usuarioSchema)
const mongoose = require('../../database')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    cpf: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

//Função do moongose que acontece antes de salvar o user.
UserSchema.pre('save', async function(next) {
    //Número de rounds da encriptação = 10.
    const hash = await bcrypt.hash(this.cpf, 10)
    this.cpf = hash

    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const authConfig = require('../../config/auth')

const User = require('../models/User')

const router = express.Router()

//Gerador de token JWT.
generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

//Rota para registro de usuários no banco de dados.
router.post('/register', async (req, res) => {
    const { email } = req.body

    try {
        //Verificação de usuário existente.
        if (await User.findOne({ email })) {
            return res.send({ error: 'User already exists' })
        }
        //Criação de novo usuário.
        const user = await User.create(req.body)

        return res.send({
            user,
            token: generateToken({ id: user.id })
        })
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' })
    }
})

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return res.status(400).send({ error: 'User not found' })
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' })
    }

    user.password = undefined

    res.send({
        user,
        token: generateToken({ id: user.id })
    })
})

module.exports = app => app.use('/auth', router)
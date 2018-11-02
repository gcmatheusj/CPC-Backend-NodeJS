const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Vote = require('../models/Vote')

const router = express.Router()

//Verifica se o tokem passado no cabeçalho é válido.
router.use(authMiddleware)

//Rotas protegidas por tokem jwt.

//Rota para registro dos votos.
router.post('/vote', async (req, res) => {
    await Vote.create(req.body)
    return res.send({ vote: 'vote successfully'})
})

module.exports = app => app.use('/api', router)
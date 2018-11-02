const express = require('express')
const bodyParser = require('body-parser')
const allowsCors = require('./config/cors')

const port = 3001

const app = express()

app.use(allowsCors)

//Função do body-parser para que ele entenda quando for enviado uma requisição para API com informações em JSON.
app.use(bodyParser.json())
//Função para decodar parametros da URL.
app.use(bodyParser.urlencoded({ extended: false }))

//Referenciando o authController/serviceController e repassando o APP.
require('./app/controllers/index')(app)

app.listen(process.env.PORT || port, function () {
    console.log(`App listening on port ${port}`)
})
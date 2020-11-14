require('dotenv').config()

const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const bodyParser = require('body-parser')

const ModelMessage = require('./src/db')

const app = express()

const server = http.createServer(app)

const io = socketIO(server)

const publicPath = path.join(__dirname, './public')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log(`Usuário conectado, id: ${socket.id}`)
})

app.get('/messages', (req, res) => {
  ModelMessage.find({}, (err, messages) => {
    res.send(messages)
  })
})

app.post('/messages', (req, res) => {
  const message = new ModelMessage(req.body)
  message.save((err) => {
    if (err) {
      res.sendStatus(500)
    }
    io.emit('message', req.body)
    res.sendStatus(200)
  })
})

server.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado na porta ${process.env.PORT}`)
})

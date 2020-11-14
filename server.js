require('dotenv').config()

const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const bodyParser = require('body-parser')

const ModelMessage = require('./src/db')
const messageAuto = require('./src/messageAuto')

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
app.post('/messages', async (req, res) => {
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }
  const message = new ModelMessage(req.body)
  await message.save((err) => {
    if (err) {
      res.sendStatus(500)
    }
  })
  io.emit('message', req.body)

  if (message.message.indexOf('!') === 0) {
    const command = message.message.replace(/!/, '').toLowerCase().capitalize()
    const messageSys = messageAuto[`message${command}`]
    const messageSysSave = new ModelMessage(messageSys)
    await messageSysSave.save((err) => {
      if (err) {
        res.sendStatus(500)
      }
    })
    io.emit('messageSys', messageSys)
  }
  res.sendStatus(200)
})

server.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado na porta ${process.env.PORT}`)
})

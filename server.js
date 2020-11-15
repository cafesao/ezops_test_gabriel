require('dotenv').config()

const path = require('path')
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const socketIO = require('socket.io')

const Routes = require('./src/routes/Routes')

const app = express()

const server = http.createServer(app)

const io = socketIO(server)

const publicPath = path.join(__dirname, './public')

io.on('connection', (socket) => {
  console.log(`Connected user, id: ${socket.id}`)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(publicPath))

app.use((req, res, next) => {
  req.io = io

  return next()
})

app.use(Routes)

server.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`)
})

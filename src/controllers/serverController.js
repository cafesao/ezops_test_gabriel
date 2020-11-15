const ModelMessage = require('../db/db')
const messageAuto = require('../functions/messageAuto')

// Função para deixar a primeira letra da palavra em maiúscula
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

module.exports = {
  take: (req, res) => {
    ModelMessage.find({}, (err, messages) => {
      res.send(messages)
    })
  },

  add: async (req, res) => {
    const message = new ModelMessage(req.body)
    await message.save((err) => {
      if (err) {
        res.sendStatus(500)
      }
    })

    req.io.emit('message', req.body)

    if (message.message.indexOf('!') === 0) {
      const command = message.message
        .replace(/!/, '')
        .toLowerCase()
        .capitalize()
      const messageSys = messageAuto[`message${command}`]
      await new ModelMessage(messageSys).save((err) => {
        if (err) {
          res.sendStatus(500)
        }
      })
      req.io.emit('messageSys', messageSys)
    }
    res.sendStatus(200)
  },
}

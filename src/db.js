const mongoose = require('mongoose')

const Messsage = mongoose.model('Message', { name: String, message: String })

mongoose.connect(
  process.env.URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log('Erro ao conectar no banco de dados: ', err)
    } else {
      console.log('Banco de dados conectado!')
    }
  },
)

module.exports = Messsage

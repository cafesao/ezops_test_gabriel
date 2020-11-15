const mongoose = require('mongoose')

const Messsage = mongoose.model('Message', { name: String, message: String })

mongoose.connect(
  process.env.URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log('Error connecting to the database: ', err)
    } else {
      console.log('Connected Database!')
    }
  },
)

module.exports = Messsage

const socket = io()
socket.on('message', addMessagesUser)
socket.on('messageSys', addMessagesSystem)

const url_Server = 'http://localhost:3000'

function addMessagesUser(message) {
  $('#messages').append(`
       <h4> ${message.name} </h4>
       <p id='user'>  ${message.message} </p>`)
}
function addMessagesSystem(message) {
  $('#messages').append(`
       <h4> ${message.name} </h4>
       <p id='system'> ${message.message}  </p>`)
}

function resetVal() {
  $('#name').val('')
  $('#message').val('')
}

async function getMessages() {
  try {
    const axiosGet = await axios.get(`${url_Server}/messages`)
    axiosGet.data.map((obj) => {
      if (obj.name === 'Sistema') {
        addMessagesSystem(obj)
      } else {
        addMessagesUser(obj)
      }
    })
  } catch (error) {
    addMessagesSystem({ name: 'Sistema', message: 'ERRO!!!' })
    console.error(error)
  }
}

async function sendMessage(message) {
  try {
    await axios.post(`${url_Server}/messages`, message)
  } catch (error) {
    addMessagesSystem({ name: 'Sistema', message: 'ERRO!!!' })
    console.error(error)
  }
  resetVal()
}

$(() => {
  resetVal()
  $('#send').click(() => {
    sendMessage({
      name: $('#name').val(),
      message: $('#message').val(),
    })
  })
  getMessages()
})

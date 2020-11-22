const socket = io()
socket.on('message', addMessagesUser)
socket.on('messageSys', addMessagesSystem)

const url_Server =
  'http://ec2-18-231-188-108.sa-east-1.compute.amazonaws.com:3000'

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
    const res = await (await fetch(`${url_Server}/messages`)).json()
    res.map((obj) => {
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
    await fetch(`${url_Server}/messages`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
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

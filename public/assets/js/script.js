const socket = io()
socket.on('message', addMessagesUser)
socket.on('messageSys', addMessagesSystem)

const url_Server =
  'http://ec2-18-231-188-108.sa-east-1.compute.amazonaws.com:3000'

async function getMessages() {
  try {
    const axiosGet = await axios.get(`${url_Server}/messages`)
    axiosGet.data.map((val) => {
      if (val.name === 'Sistema') {
        addMessagesSystem(val)
      } else {
        addMessagesUser(val)
      }
    })
  } catch (error) {
    console.error(error)
  }
}

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

async function sendMessage(message) {
  try {
    await axios.post(`${url_Server}/messages`, message)
  } catch (error) {
    console.error(error)
  }
  $('#name').val('')
  $('#message').val('')
}

$(() => {
  $('#name').val('')
  $('#message').val('')
  $('#send').click(() => {
    sendMessage({
      name: $('#name').val(),
      message: $('#message').val(),
    })
  })
  getMessages()
})

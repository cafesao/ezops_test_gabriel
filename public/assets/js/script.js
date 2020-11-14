const socket = io()
socket.on('message', addMessages)

const url_Server = 'http://localhost:3000'

async function getMessages() {
  try {
    const axiosGet = await axios.get(`${url_Server}/messages`)
    axiosGet.data.map((val) => addMessages(val))
  } catch (error) {
    console.error(error)
  }
}

async function addMessages(message) {
  $('#messages').append(`
       <h4> ${message.name} </h4>
       <p>  ${message.message} </p>`)
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

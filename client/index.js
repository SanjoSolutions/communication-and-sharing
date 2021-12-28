const $chatMessages = document.querySelector('.chat__messages')
const $chatInput = document.querySelector('.chat__input')

const socket = new WebSocket('ws://localhost:8081')

socket.addEventListener('message', async function onMessage(event) {
  const $message = document.createElement('div')
  $message.textContent = await event.data
  $chatMessages.appendChild($message)
})

function submitMessage() {
  const message = $chatInput.value
  socket.send(message)
  $chatInput.value = ''
}

const form = document.querySelector('.chat__message-writing')
form.addEventListener('submit', function onSubmit(event) {
  event.preventDefault()
  submitMessage()
})

$chatInput.addEventListener('input', function onInput() {
  this.style.height = 'auto'
  this.style.height = this.scrollHeight + 'px'
})

$chatInput.addEventListener('keydown', function onKeyDown(event) {
  if (event.ctrlKey && event.key === 'Enter') {
    submitMessage()
  }
})

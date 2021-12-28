const $chatMessages = document.querySelector('.chat__messages')
const $chatInput = document.querySelector('.chat__input')

let isInitialLoad = true
let isScrollingInHistory = false

function determineBottomScrollPosition() {
  return $chatMessages.scrollHeight - $chatMessages.clientHeight
}

function scrollDown() {
  $chatMessages.scrollTop = determineBottomScrollPosition()
}

const socket = new WebSocket('ws://192.168.178.22:8081')

socket.addEventListener('message', async function onMessage(event) {
  const $message = document.createElement('div')
  $message.textContent = await event.data
  $chatMessages.appendChild($message)
  if (isInitialLoad || !isScrollingInHistory) {
    scrollDown()
  }
  isInitialLoad = false
})

$chatMessages.addEventListener('scroll', function onScroll() {
  isScrollingInHistory = $chatMessages.scrollTop < determineBottomScrollPosition()
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
  resizeChatInput()
})

function resizeChatInput() {
  $chatInput.style.height = 'auto'
  $chatInput.style.height = this.scrollHeight + 'px'
}

$chatInput.addEventListener('keydown', function onKeyDown(event) {
  if (event.ctrlKey && event.key === 'Enter') {
    submitMessage()
  }
})

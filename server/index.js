import { WebSocketServer } from 'ws'
import fs from 'fs/promises'

const log = await fs.open('log.txt', 'a')

const server = new WebSocketServer({
  port: 8081,
  clientTracking: true
})

server.on('connection', function onConnection(socket) {
  socket.on('message', function onMessage(data) {
    const message = data.toString()
    log.appendFile(message + '\n')
    server.clients.forEach(client => client.send(message))
  })
})

import { WebSocketServer } from 'ws'
import fs from 'fs/promises'

const logFile = await fs.open('log.txt', 'a+')
let log = await logFile.readFile({encoding: 'utf-8'})

const server = new WebSocketServer({
  port: 8081,
  clientTracking: true
})

server.on('connection', function onConnection(socket) {
  socket.send(log)

  socket.on('message', function onMessage(data) {
    const message = data.toString()
    log += message + '\n'
    logFile.appendFile(message + '\n')
    server.clients.forEach(client => client.send(message))
  })
})

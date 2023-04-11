const express = require('express')
const dotenv = require('dotenv')
const path = require('path')

const { connectToMongoDB } = require('./src/config')
const { userRoutes, chatRoutes, messageRoutes } = require('./src/routes')
const { notFound, errorHandler } = require('./src/middleware')

const app = express()
app.use(express.json())
dotenv.config({ path: path.join(__dirname, './.env') })
connectToMongoDB()

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

// --------------------------DEPLOYMENT------------------------------

// handle invalid routes
app.use(notFound)
app.use(errorHandler)

const server = app.listen(process.env.PORT, () => console.log(`Server started on PORT ${process.env.PORT}`))

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
  pingTimeout: 60 * 1000,
})

io.on('connection', (socket) => {
  console.log('Connected to socket.io')

  socket.on('setup', (userData) => {
    socket.join(userData._id)
    socket.emit('connected')
  })

  socket.on('join chat', (room) => {
    socket.join(room)
    console.log('User joined room ' + room)
  })

  socket.on('typing', (room) => socket.in(room).emit('typing'))

  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'))

  socket.on('new message', (newMessageRecieved) => {
    // change it to object
    let chat = newMessageRecieved.chat[0]

    if (!chat.users) return console.log('chat.users not defined')

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return

      socket.in(user._id).emit('message recieved', newMessageRecieved)
    })
  })

  socket.off('setup', () => {
    console.log('User Disconnected')
    socket.leave(userData._id)
  })
})

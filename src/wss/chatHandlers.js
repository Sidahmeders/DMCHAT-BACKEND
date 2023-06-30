const { LISTENERS, EVENTS } = require('./constant')

module.exports = (io, socket) => {
  socket.on(LISTENERS.setup, (userData) => {
    socket.join(userData._id)
    socket.emit(EVENTS.connected)
  })

  socket.on(LISTENERS.joinChat, (room) => socket.join(room))

  socket.on(LISTENERS.typing, (room) => socket.in(room).emit(EVENTS.typing, room))

  socket.on(LISTENERS.stopTyping, (room) => socket.in(room).emit(EVENTS.stopTyping, room))

  socket.on(LISTENERS.newMessage, (payload) => {
    const { createdMessage } = payload
    const chat = createdMessage.chat[0]
    if (!chat.users) return
    chat.users.forEach((user) => {
      if (user._id === createdMessage.sender._id) return
      socket.in(user._id).emit(EVENTS.messageRecieved, payload)
    })
  })

  socket.off(LISTENERS.setup, () => {
    socket.leave(userData._id)
  })
}

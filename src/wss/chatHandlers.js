const { LISTENERS, EVENTS } = require('./constant')

module.exports = (io, socket) => {
  socket.on(LISTENERS.setup, (userData) => {
    socket.join(userData._id)
    socket.emit(EVENTS.connected)
  })

  socket.on(LISTENERS.joinChat, (room) => socket.join(room))

  socket.on(LISTENERS.typing, (room) => socket.in(room).emit(EVENTS.typing, room))

  socket.on(LISTENERS.stopTyping, (room) => socket.in(room).emit(EVENTS.typingStopped, room))

  socket.on(LISTENERS.newMessage, (payload) => {
    try {
      const { createdMessage } = payload
      const [firstChat] = createdMessage.chat
      if (!firstChat.users) return

      firstChat.users.forEach((user) => {
        if (user._id === createdMessage.sender._id) return
        socket.in(user._id).emit(EVENTS.messageRecieved, payload)
      })
    } catch (error) {
      socket.emit(EVENTS.chatError, error.message)
    }
  })

  socket.on(LISTENERS.updateGroup, (payload) => socket.emit(EVENTS.groupUpdated, payload))

  socket.off(LISTENERS.setup, () => {
    socket.leave(userData._id)
  })
}

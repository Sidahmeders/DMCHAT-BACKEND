const { listeners, events } = require('./constant')

module.exports = (io, socket) => {
  socket.on(listeners.setup, (userData) => {
    socket.join(userData._id)
    socket.emit(events.connected)
  })

  socket.on(listeners.joinChat, (room) => socket.join(room))

  socket.on(listeners.typing, (room) => socket.in(room).emit(events.typing))

  socket.on(listeners.stopTyping, (room) => socket.in(room).emit(events.stopTyping))

  socket.on(listeners.newMessage, (newMessageRecieved) => {
    const chat = newMessageRecieved.chat[0]
    if (!chat.users) return
    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return
      socket.in(user._id).emit(events.messageRecieved, newMessageRecieved)
    })
  })

  socket.off(listeners.setup, () => {
    socket.leave(userData._id)
  })
}

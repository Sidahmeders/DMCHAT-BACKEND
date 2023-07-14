const CHAT_EVENT_LISTENERS = {
  setup: 'setup',
  connected: 'connected',
  chatError: 'chat error',
  joinChat: 'join chat',
  typing: 'typing',
  stopTyping: 'stop typing',
  newMessage: 'new message',
  updateGroup: 'update group',
  deleteChat: 'delete chat',
}

module.exports = (io, socket) => {
  socket.on(CHAT_EVENT_LISTENERS.setup, (userData) => {
    socket.join(userData._id)
    socket.emit(CHAT_EVENT_LISTENERS.connected)
  })

  socket.off(CHAT_EVENT_LISTENERS.setup, () => {
    socket.leave(userData._id)
  })

  socket.on(CHAT_EVENT_LISTENERS.joinChat, (room) => socket.join(room))

  socket.on(CHAT_EVENT_LISTENERS.typing, (room) => {
    socket.in(room).emit(CHAT_EVENT_LISTENERS.typing, room)
  })

  socket.on(CHAT_EVENT_LISTENERS.stopTyping, (room) => {
    socket.in(room).emit(CHAT_EVENT_LISTENERS.stopTyping, room)
  })

  socket.on(CHAT_EVENT_LISTENERS.newMessage, (payload) => {
    try {
      const { createdMessage } = payload
      const [firstChat] = createdMessage.chat
      if (!firstChat?.users) return

      firstChat.users.forEach((user) => {
        if (user._id === createdMessage.sender._id) return
        socket.in(user._id).emit(CHAT_EVENT_LISTENERS.newMessage, payload)
      })
    } catch (error) {
      socket.emit(CHAT_EVENT_LISTENERS.chatError, error.message)
    }
  })

  socket.on(CHAT_EVENT_LISTENERS.updateGroup, (payload) => {
    io.emit(CHAT_EVENT_LISTENERS.updateGroup, payload)
  })

  socket.on(CHAT_EVENT_LISTENERS.deleteChat, (payload) => {
    io.emit(CHAT_EVENT_LISTENERS.deleteChat, payload)
  })
}

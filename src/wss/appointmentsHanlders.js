const { listeners, events } = require('./constant')

module.exports = (io, socket) => {
  socket.on(listeners.joinChat, (room) => socket.join(room))

  socket.on(listeners.confirmAppointment, (payload) => {
    io.emit(events.appointmentConfirmation, payload)
  })

  socket.on(listeners.leaveAppointment, (payload) => {
    io.emit(events.appointmentleft, payload)
  })

  socket.on(listeners.dropAppointment, (payload) => {
    io.emit(events.appointmentDropped, payload)
  })
}

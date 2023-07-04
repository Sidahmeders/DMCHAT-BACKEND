const { LISTENERS, EVENTS } = require('./constant')

module.exports = (io, socket) => {
  socket.on(LISTENERS.joinChat, (room) => socket.join(room))

  socket.on(LISTENERS.confirmAppointment, (payload) => {
    io.emit(EVENTS.appointmentConfirmation, payload)
  })

  socket.on(LISTENERS.leaveAppointment, (payload) => {
    io.emit(EVENTS.appointmentleft, payload)
  })

  socket.on(LISTENERS.dropAppointment, (payload) => {
    io.emit(EVENTS.appointmentDropped, payload)
  })

  socket.on(LISTENERS.messageAppointment, (payload) => {
    io.emit(EVENTS.appointmentMessaged, payload)
  })

  socket.on(LISTENERS.paymentAppointment, (payload) => {
    io.emit(EVENTS.appointmentPaid, payload)
  })

  socket.on(LISTENERS.updateAppointment, (payload) => {
    io.emit(EVENTS.appointmentUpdate, payload)
  })
}

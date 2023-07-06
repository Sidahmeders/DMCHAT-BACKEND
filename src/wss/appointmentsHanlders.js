const { LISTENERS, EVENTS } = require('./constant')

module.exports = (io, socket) => {
  socket.on(LISTENERS.joinChat, (room) => socket.join(room))

  socket.on(LISTENERS.confirmAppointment, (payload) => {
    // console.log(payload, 'confirmAppointment')
    io.emit(EVENTS.appointmentConfirmation, payload)
  })

  socket.on(LISTENERS.leaveAppointment, (payload) => {
    // console.log(payload, 'leaveAppointment')
    io.emit(EVENTS.appointmentleft, payload)
  })

  socket.on(LISTENERS.dropAppointment, (payload) => {
    // console.log(payload, 'dropAppointment')
    io.emit(EVENTS.appointmentDropped, payload)
  })

  socket.on(LISTENERS.messageAppointment, (payload) => {
    // console.log(payload, 'messageAppointment')
    io.emit(EVENTS.appointmentMessaged, payload)
  })

  socket.on(LISTENERS.paymentAppointment, (payload) => {
    // console.log(payload, 'paymentAppointment')
    io.emit(EVENTS.appointmentPaid, payload)
  })

  socket.on(LISTENERS.updateAppointment, (payload) => {
    // console.log(payload, 'updateAppointment')
    io.emit(EVENTS.appointmentUpdate, payload)
  })

  socket.on(LISTENERS.reorderAppointment, (payload) => {
    // console.log(payload, 'reorderAppointment')
    io.emit(EVENTS.appointmentReordered, payload)
  })
}

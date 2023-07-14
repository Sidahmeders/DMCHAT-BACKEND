const APPOINTMENT_EVENT_LISTENERS = {
  confirmAppointment: 'confirm appointment',
  leaveAppointment: 'leave appointment',
  dropAppointment: 'drop appointment',
  paymentAppointment: 'payment appointment',
  updateAppointment: 'update appointment',
  reorderAppointment: 'reorder appointment',
}

module.exports = (io, socket) => {
  socket.on(APPOINTMENT_EVENT_LISTENERS.confirmAppointment, (payload) => {
    io.emit(APPOINTMENT_EVENT_LISTENERS.confirmAppointment, payload)
  })

  socket.on(APPOINTMENT_EVENT_LISTENERS.leaveAppointment, (payload) => {
    io.emit(APPOINTMENT_EVENT_LISTENERS.leaveAppointment, payload)
  })

  socket.on(APPOINTMENT_EVENT_LISTENERS.dropAppointment, (payload) => {
    io.emit(APPOINTMENT_EVENT_LISTENERS.dropAppointment, payload)
  })

  socket.on(APPOINTMENT_EVENT_LISTENERS.paymentAppointment, (payload) => {
    io.emit(APPOINTMENT_EVENT_LISTENERS.paymentAppointment, payload)
  })

  socket.on(APPOINTMENT_EVENT_LISTENERS.updateAppointment, (payload) => {
    io.emit(APPOINTMENT_EVENT_LISTENERS.updateAppointment, payload)
  })

  socket.on(APPOINTMENT_EVENT_LISTENERS.reorderAppointment, (payload) => {
    io.emit(APPOINTMENT_EVENT_LISTENERS.reorderAppointment, payload)
  })
}

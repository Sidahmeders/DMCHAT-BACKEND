const LISTENERS = {
  // chat listeners
  setup: 'setup',
  joinChat: 'join chat',
  typing: 'typing',
  stopTyping: 'stop typing',
  newMessage: 'new message',
  // appointment listeners
  confirmAppointment: 'confirm appointment',
  leaveAppointment: 'leave appointment',
  dropAppointment: 'drop appointment',
  messageAppointment: 'message appointment',
  paymentAppointment: 'payment appointment',
  updateAppointment: 'update appointment',
  reorderAppointment: 'reorder appointment',
}

const EVENTS = {
  // chat listeners
  connected: 'connected',
  chatError: 'chat error',
  typing: 'typing',
  stopTyping: 'stop typing',
  messageRecieved: 'message recieved',
  // appointment listeners
  appointmentConfirmation: 'appointment confirmation',
  appointmentleft: 'appointment left',
  appointmentDropped: 'appointment dropped',
  appointmentMessaged: 'appointment messaged',
  appointmentPaid: 'appointment paid',
  appointmentUpdated: 'appointment updated',
  appointmentReordered: 'appointment reordered',
}

module.exports = {
  LISTENERS,
  EVENTS,
}

const listeners = {
  // chat listeners
  joinChat: 'join chat',
  typing: 'typing',
  stopTyping: 'stop typing',
  newMessage: 'new message',
  // appointment listeners
  confirmAppointment: 'confirm appointment',
  leaveAppointment: 'leave appointment',
  dropAppointment: 'drop appointment',
  messageAppointment: 'message appointment',
}

const events = {
  // chat listeners
  connected: 'connected',
  typing: 'typing',
  stopTyping: 'stop typing',
  messageRecieved: 'message recieved',
  // appointment listeners
  appointmentConfirmation: 'appointment confirmation',
  appointmentleft: 'appointment left',
  appointmentDropped: 'appointment dropped',
  appointmentMessaged: 'appointment messaged',
}

module.exports = {
  listeners,
  events,
}

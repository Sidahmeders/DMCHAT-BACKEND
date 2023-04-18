const listeners = {
  // chat listeners
  joinChat: 'join chat',
  typing: 'typing',
  stopTyping: 'stop typing',
  newMessage: 'new message',
  // appointment listeners
  confirmAppointment: 'confirm appointment',
  leaveAppointment: 'leave appointment',
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
}

module.exports = {
  listeners,
  events,
}

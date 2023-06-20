const { Appointment, Calendar, Message, Chat, Patient, User } = require('../models')
const { generateToken, generateHashedPassword, verifyPassword } = require('../config')

// ** users controllers ** //
const makeAuthenticateUser = require('./users/authenticateUser')
const makeFetchAllUsers = require('./users/fetchAllUsers')
const makeRegisterUser = require('./users/registerUser')

// ** chats controllers ** //
const makeAccessChat = require('./chats/accessChat')
const makeAddToGroup = require('./chats/addToGroup')
const makeCreateGroupChat = require('./chats/createGroupChat')
const makeFetchChats = require('./chats/fetchChats')
const makeRemoveFromGroup = require('./chats/removeFromGroup')
const makeRenameGroup = require('./chats/renameGroup')

const PatientController = require('./PatientController')
const AppointmentController = require('./AppointmentController')
const CalendarController = require('./CalendarController')
const MessageController = require('./MessageController')

module.exports.patientController = new PatientController({ Patient })
module.exports.appointmentController = new AppointmentController({ Appointment })
module.exports.calendarController = new CalendarController({ Calendar })
module.exports.messageController = new MessageController({ Message, Chat })

module.exports.usersControllers = {
  authenticateUser: makeAuthenticateUser({ User, generateToken, verifyPassword }),
  fetchAllUsers: makeFetchAllUsers({ User }),
  registerUser: makeRegisterUser({ User, generateToken, generateHashedPassword }),
}

module.exports.chatControllers = {
  accessChat: makeAccessChat({ Chat, User }),
  addToGroup: makeAddToGroup({ Chat }),
  createGroupChat: makeCreateGroupChat({ Chat }),
  fetchChats: makeFetchChats({ Chat, User }),
  removeFromGroup: makeRemoveFromGroup({ Chat }),
  renameGroup: makeRenameGroup({ Chat }),
}

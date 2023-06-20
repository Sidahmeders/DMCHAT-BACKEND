const { Appointment, Calendar, Message, Chat, Patient, User } = require('../models')
const { generateToken, generateHashedPassword, verifyPassword } = require('../config')

// ** appointment controllers ** //
const makeCreateNewAppointment = require('./appointments/createNewAppointment')
const makeDeleteAppointment = require('./appointments/deleteAppointment')
const makeFetchDayAppointments = require('./appointments/fetchDayAppointments')
const makeFetchMonthAppointments = require('./appointments/fetchMonthAppointments')
const makeFetchPatientAppointments = require('./appointments/fetchPatientAppointments')
const makeRelateNewAppointment = require('./appointments/relateNewAppointment')
const makeToggleConfirmation = require('./appointments/toggleConfirmation')
const makeToggleLeave = require('./appointments/toggleLeave')
const makeUpdateAppointment = require('./appointments/updateAppointment')
const makeUpdateAppointmentsHistory = require('./appointments/updateAppointmentsHistory')

// ** calendar controllers ** //
const makeFetchDayCalendar = require('./calendar/fetchDayCalendar')
const makeSetCalendarDayAvailability = require('./calendar/setCalendarDayAvailability')

// ** messages controllers ** //
const makeFetchMessagesByChatId = require('./messages/fetchMessagesByChatId')
const makeSendMessage = require('./messages/sendMessage')

const PatientController = require('./PatientController')

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

module.exports.patientController = new PatientController({ Patient })

module.exports.appointmentsControllers = {
  createNewAppointment: makeCreateNewAppointment({ Appointment }),
  deleteAppointment: makeDeleteAppointment({ Appointment }),
  fetchDayAppointments: makeFetchDayAppointments({ Appointment }),
  fetchMonthAppointments: makeFetchMonthAppointments({ Appointment }),
  fetchPatientAppointments: makeFetchPatientAppointments({ Appointment }),
  relateNewAppointment: makeRelateNewAppointment({ Appointment }),
  toggleConfirmation: makeToggleConfirmation({ Appointment }),
  toggleLeave: makeToggleLeave({ Appointment }),
  updateAppointment: makeUpdateAppointment({ Appointment }),
  updateAppointmentsHistory: makeUpdateAppointmentsHistory({ Appointment }),
}

module.exports.calendarControllers = {
  fetchDayCalendar: makeFetchDayCalendar({ Calendar }),
  setCalendarDayAvailability: makeSetCalendarDayAvailability({ Calendar }),
}

module.exports.messageControllers = {
  fetchMessagesByChatId: makeFetchMessagesByChatId({ Message }),
  sendMessage: makeSendMessage({ Message, Chat }),
}

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

const { Appointment, Calendar, Message, Chat, Patient, User } = require('../models')
const { generateToken, generateHashedPassword, verifyPassword } = require('../config')

// ** appointment controllers ** //
const makeConfirmAppointment = require('./appointments/confirmAppointment')
const makeCreateNewAppointment = require('./appointments/createNewAppointment')
const makeDeleteAppointment = require('./appointments/deleteAppointment')
const makeFetchDayAppointments = require('./appointments/fetchDayAppointments')
const makeFetchMonthAppointments = require('./appointments/fetchMonthAppointments')
const makeFetchPatientAppointments = require('./appointments/fetchPatientAppointments')
const makeLeaveAppointment = require('./appointments/leaveAppointment')
const makeRelateNewAppointment = require('./appointments/relateNewAppointment')
const makeUpdateAppointment = require('./appointments/updateAppointment')
const makeUpdateAppointmentsHistory = require('./appointments/updateAppointmentsHistory')

// ** calendar controllers ** //
const makeFetchDayCalendar = require('./calendar/fetchDayCalendar')
const makeSetCalendarDayAvailability = require('./calendar/setCalendarDayAvailability')

// ** messages controllers ** //
const makeFetchMessagesByChatId = require('./messages/fetchMessagesByChatId')
const makeSendMessage = require('./messages/sendMessage')

// ** patients controllers ** //
const makeCreatePatient = require('./patients/createPatient')
const makeDeletePatientById = require('./patients/deletePatientById')
const makeFetchAllPatients = require('./patients/fetchAllPatients')
const makeFetchPatientsById = require('./patients/fetchPatientsById')
const makeFetchPatientsByName = require('./patients/fetchPatientsByName')
const makeUpdatePatientById = require('./patients/updatePatientById')

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

module.exports.appointmentsControllers = {
  confirmAppointment: makeConfirmAppointment({ Appointment }),
  createNewAppointment: makeCreateNewAppointment({ Appointment }),
  deleteAppointment: makeDeleteAppointment({ Appointment }),
  fetchDayAppointments: makeFetchDayAppointments({ Appointment }),
  fetchMonthAppointments: makeFetchMonthAppointments({ Appointment }),
  fetchPatientAppointments: makeFetchPatientAppointments({ Appointment }),
  leaveAppointment: makeLeaveAppointment({ Appointment }),
  relateNewAppointment: makeRelateNewAppointment({ Appointment }),
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

module.exports.patientsControllers = {
  createPatient: makeCreatePatient({ Patient }),
  deletePatientById: makeDeletePatientById({ Patient }),
  fetchAllPatients: makeFetchAllPatients({ Patient }),
  fetchPatientsById: makeFetchPatientsById({ Patient }),
  fetchPatientsByName: makeFetchPatientsByName({ Patient }),
  updatePatientById: makeUpdatePatientById({ Patient }),
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

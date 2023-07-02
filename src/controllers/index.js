const { Appointment, Calendar, Message, Chat, Patient, User, Payment } = require('../models')
const { generateToken, generateHashedPassword, verifyPassword } = require('../config')

const UserController = require('./UserController')
const PatientController = require('./PatientController')
const AppointmentController = require('./AppointmentController')
const CalendarController = require('./CalendarController')
const MessageController = require('./MessageController')
const ChatController = require('./ChatController')
const PaymentController = require('./PaymentController')
const StatisticsController = require('./StatisticsController.js')

module.exports = {
  userController: new UserController({ User, generateToken, verifyPassword, generateHashedPassword }),
  patientController: new PatientController({ Patient }),
  appointmentController: new AppointmentController({ Appointment }),
  calendarController: new CalendarController({ Calendar }),
  messageController: new MessageController({ Message, Chat }),
  chatController: new ChatController({ Chat, User }),
  paymentController: new PaymentController({ Payment }),
  statisticsController: new StatisticsController({ Patient, Payment, Appointment }),
}

const userRoutes = require('./user.routes')
const chatRoutes = require('./chat.routes')
const messageRoutes = require('./message.routes')
const patientRoutes = require('./patient.routes')
const calendarRoutes = require('./calendar.routes')
const appointmentRoutes = require('./appointment.routes')

/**
 * @openapi
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the appointment
 *           readOnly: true
 *         sender:
 *           type: string
 *           description: The ID of the sender (user)
 *         patient:
 *           type: string
 *           description: The ID of the patient
 *         baseAppointmentId:
 *           type: string
 *           description: The ID of the base appointment (if related)
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date of the appointment
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The end date of the appointment
 *         title:
 *           type: string
 *           description: The title of the appointment
 *         motif:
 *           type: string
 *           description: The motif of the appointment
 *         diagnostic:
 *           type: string
 *           description: The diagnostic information
 *         treatmentPlan:
 *           type: string
 *           description: The treatment plan
 *         totalPrice:
 *           type: number
 *           description: The total price of the appointment
 *         payment:
 *           type: number
 *           description: The payment amount
 *         paymentLeft:
 *           type: number
 *           description: The remaining payment amount
 *         isNewTreatment:
 *           type: boolean
 *           description: Indicates if the appointment is for a new treatment
 *         isConfirmed:
 *           type: boolean
 *           description: Indicates if the appointment is confirmed
 *         isLeft:
 *           type: boolean
 *           description: Indicates if the appointment is left
 *         isWaitingRoom:
 *           type: boolean
 *           description: Indicates if the appointment is in the waiting room
 *         isDone:
 *           type: boolean
 *           description: Indicates if the appointment is done
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the appointment
 *           readOnly: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the appointment
 *           readOnly: true
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         sender:
 *           type: string
 *         fullName:
 *           type: string
 *         age:
 *           type: integer
 *         phoneNumber:
 *           type: string
 *         generalState:
 *           type: string
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Calendar:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the calendar entry
 *         sender:
 *           type: string
 *           description: The ID of the associated user
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the calendar entry
 *         availability:
 *           type: string
 *           enum: [EMPTY, REST, BUSY, LOADED]
 *           description: The availability status for the calendar entry
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the calendar entry
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the calendar entry
 *       required:
 *         - date
 *         - availability
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the chat
 *         chatName:
 *           type: string
 *           description: The name of the chat
 *         isGroupChat:
 *           type: boolean
 *           default: false
 *           description: Indicates if the chat is a group chat
 *         users:
 *           type: array
 *           items:
 *             type: string
 *             description: The IDs of the users participating in the chat
 *         latestMessage:
 *           type: string
 *           description: The ID of the latest message in the chat
 *         groupAdmin:
 *           type: string
 *           description: The ID of the group chat admin user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the chat
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the chat
 *       required:
 *         - chatName
 *         - users
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the message
 *         sender:
 *           type: string
 *           description: The ID of the message sender
 *         content:
 *           type: string
 *           description: The content of the message
 *         chat:
 *           type: array
 *           items:
 *             type: string
 *             description: The IDs of the chats the message belongs to
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the message
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the message
 *       required:
 *         - sender
 *         - content
 *         - chat
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the user
 *           readOnly: true
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         pic:
 *           type: string
 *           description: The profile picture URL of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the user
 *           readOnly: true
 */

module.exports = {
  userRoutes,
  chatRoutes,
  messageRoutes,
  patientRoutes,
  calendarRoutes,
  appointmentRoutes,
}

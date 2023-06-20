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
 *         isNewTreatment:
 *           type: boolean
 *           description: Indicates if the appointment is for a new treatment
 *         totalPrice:
 *           type: number
 *           description: The total price of the appointment
 *         payment:
 *           type: number
 *           description: The payment amount
 *         paymentLeft:
 *           type: number
 *           description: The remaining payment amount
 *         motif:
 *           type: string
 *           description: The motif of the appointment
 *         diagnostic:
 *           type: string
 *           description: The diagnostic information
 *         treatmentPlan:
 *           type: string
 *           description: The treatment plan
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

module.exports = {
  userRoutes,
  chatRoutes,
  messageRoutes,
  patientRoutes,
  calendarRoutes,
  appointmentRoutes,
}

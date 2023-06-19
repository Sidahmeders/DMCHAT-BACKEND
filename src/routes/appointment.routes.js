const express = require('express')

const { protect } = require('../middleware')
const { appointmentsControllers } = require('../controllers')

const router = express.Router()

router.route('/:patientId').get(protect, appointmentsControllers.fetchPatientAppointments)
router.route('/:year/:month').get(protect, appointmentsControllers.fetchMonthAppointments)
router.route('/:year/:month/:day').get(protect, appointmentsControllers.fetchDayAppointments)

router.route('/new').post(protect, appointmentsControllers.createNewAppointment)
router.route('/relate').post(protect, appointmentsControllers.relateNewAppointment)

router.route('/:id/confirm').put(protect, appointmentsControllers.confirmAppointment)
router.route('/:id/leave').put(protect, appointmentsControllers.leaveAppointment)
router.route('/:id/update').put(protect, appointmentsControllers.updateAppointment)
router.route('/history').put(protect, appointmentsControllers.updateAppointmentsHistory)

router.route('/:id').delete(protect, appointmentsControllers.deleteAppointment)

module.exports = router

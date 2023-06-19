const express = require('express')

const { protect } = require('../middleware')
const { patientsControllers } = require('../controllers')

const router = express.Router()

router.route('/').get(protect, patientsControllers.fetchAllPatients)
router.route('/:id').get(protect, patientsControllers.fetchPatientsById)
router.route('/fullname/:name').get(protect, patientsControllers.fetchPatientsByName)

router.route('/').post(protect, patientsControllers.createPatient)

router.route('/:id').put(protect, patientsControllers.updatePatientById)

router.route('/:id').delete(protect, patientsControllers.deletePatientById)

module.exports = router

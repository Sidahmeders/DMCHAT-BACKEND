const express = require('express')
const { protect } = require('../middleware')
const { fetchAllPatients, fetchPatientsByName, createPatient } = require('../controllers/patientController')

const router = express.Router()

router.route('/').get(protect, fetchAllPatients)
router.route('/:name').get(protect, fetchPatientsByName)

router.route('/').post(protect, createPatient)

module.exports = router

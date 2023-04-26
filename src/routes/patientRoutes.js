const express = require('express')
const { protect } = require('../middleware')
const { createPatient, fetchPatientsByName } = require('../controllers/patientController')

const router = express.Router()

router.route('/:name').get(protect, fetchPatientsByName)

router.route('/').post(protect, createPatient)

module.exports = router

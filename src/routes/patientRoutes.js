const express = require('express')
const { protect } = require('../middleware')
const {
  fetchAllPatients,
  fetchPatientsById,
  fetchPatientsByName,
  createPatient,
  updatePatientById,
  deletePatientById,
} = require('../controllers/patientController')

const router = express.Router()

router.route('/').get(protect, fetchAllPatients)
router.route('/:id').get(protect, fetchPatientsById)
router.route('/fullname/:name').get(protect, fetchPatientsByName)

router.route('/').post(protect, createPatient)

router.route('/:id').put(protect, updatePatientById)

router.route('/:id').delete(protect, deletePatientById)

module.exports = router

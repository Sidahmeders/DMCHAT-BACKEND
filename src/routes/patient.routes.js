const express = require('express')
const { Endpoints } = require('../config')
const { authenticate, accessControl, validatePatient } = require('../middleware')
const { patientController } = require('../controllers')

/**
 * @openapi
 * tags:
 *   name: Patients
 *   description: API endpoints for managing patients
 */
const router = express.Router()

/**
 * @openapi
 * /api/patients:
 *   get:
 *     summary: Fetch patients
 *     tags: [Patients]
 *     description: Retrieve a paginated list of all patients
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: The page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: The number of patients to fetch per page
 *       - in: query
 *         name: fullName
 *         schema:
 *           type: string
 *         description: The sub-string of the patient fullname
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 *       '400':
 *         description: Bad request
 */
router.get(Endpoints.PATIENT.GET.fetchPatients, authenticate, accessControl, patientController.fetchPatients)

/**
 * @openapi
 * /api/patients/{id}:
 *   get:
 *     summary: Fetch patient by ID
 *     tags: [Patients]
 *     description: Retrieve a patient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the patient
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Patient not found
 */
router.get(Endpoints.PATIENT.GET.fetchPatientsById, authenticate, accessControl, patientController.fetchPatientsById)

/**
 * @openapi
 * /api/patients:
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     description: Create a new patient with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       '400':
 *         description: Bad request
 */
router.post(
  Endpoints.PATIENT.POST.createPatient,
  authenticate,
  accessControl,
  validatePatient,
  patientController.createPatient,
)

/**
 * @openapi
 * /api/patients/{id}:
 *   put:
 *     summary: Update patient by ID
 *     tags: [Patients]
 *     description: Update the data of a patient specified by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the patient to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Patient not found
 */
router.put(
  Endpoints.PATIENT.PUT.updatePatientById,
  authenticate,
  accessControl,
  validatePatient,
  patientController.updatePatientById,
)

/**
 * @openapi
 * /api/patients/{id}:
 *   delete:
 *     summary: Delete patient by ID
 *     tags: [Patients]
 *     description: Delete a patient specified by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the patient to delete
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Patient not found
 */
router.delete(
  Endpoints.PATIENT.DELETE.deletePatientById,
  authenticate,
  accessControl,
  patientController.deletePatientById,
)

module.exports = router

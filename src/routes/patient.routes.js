const express = require('express')

const { protect } = require('../middleware')
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
router.get('/', protect, patientController.fetchPatients)

router.route('/:id').get(protect, patientController.fetchPatientsById)

router.route('/fullname/:name').get(protect, patientController.fetchPatientsByName)

router.route('/').post(protect, patientController.createPatient)

router.route('/:id').put(protect, patientController.updatePatientById)

router.route('/:id').delete(protect, patientController.deletePatientById)

module.exports = router

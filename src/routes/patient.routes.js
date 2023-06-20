const express = require('express')

const { protect } = require('../middleware')
const { patientsControllers } = require('../controllers')

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
router.get('/', protect, patientsControllers.fetchPatients)

router.route('/:id').get(protect, patientsControllers.fetchPatientsById)

router.route('/fullname/:name').get(protect, patientsControllers.fetchPatientsByName)

router.route('/').post(protect, patientsControllers.createPatient)

router.route('/:id').put(protect, patientsControllers.updatePatientById)

router.route('/:id').delete(protect, patientsControllers.deletePatientById)

module.exports = router

import { createProfile, createDriverProfile, updateProfile, updateDriverProfile, deleteProfile, deleteDriverProfile } from "../../controllers/profiles/profiles.js";
import router from "../../router/router.js";

/**
 * @swagger
 * tags:
 *   - name: Profiles
 *     description: User and driver profile management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         role:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 * 
 *     DriverProfile:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *         date_of_birth:
 *           type: string
 *           format: date
 *         license_class:
 *           type: string
 *         vehicle_reg_number:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 * 
 *     ProfileRequest:
 *       type: object
 *       required:
 *         - id
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         role:
 *           type: string
 * 
 *     DriverProfileRequest:
 *       type: object
 *       required:
 *         - userID
 *         - dob
 *         - licenseClass
 *         - vehicleRegNumber
 *       properties:
 *         userID:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         licenseClass:
 *           type: string
 *         vehicleRegNumber:
 *           type: string
 * 
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Failed to create profile"
 */

/**
 * @swagger
 * /profile/create:
 *   post:
 *     tags: [Profiles]
 *     summary: Create a new user profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileRequest'
 *     responses:
 *       201:
 *         description: Profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Failed to create profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /profile/driver/create:
 *   post:
 *     tags: [Profiles]
 *     summary: Create a new driver profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DriverProfileRequest'
 *     responses:
 *       200:
 *         description: Driver profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Failed to create driver profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /profile/{id}/update:
 *   patch:
 *     tags: [Profiles]
 *     summary: Update a user profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileRequest'
 *     responses:
 *       201:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Failed to update profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /profile/driver/{userID}/update:
 *   patch:
 *     tags: [Profiles]
 *     summary: Update a driver profile
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DriverProfileRequest'
 *     responses:
 *       200:
 *         description: Driver profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Failed to update driver profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /profile/{id}/delete:
 *   delete:
 *     tags: [Profiles]
 *     summary: Delete a user profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Failed to delete profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /profile/driver/{userID}/delete:
 *   delete:
 *     tags: [Profiles]
 *     summary: Delete a driver profile
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Driver profile deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Failed to delete driver profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export default(app) => {
    router.post('/profile/create', createProfile)
    router.post('/profile/driver/create', createDriverProfile)
    router.patch('/profile/:id/update', updateProfile)
    router.patch('/profile/driver/:userID/update', updateDriverProfile)
    router.delete('/profile/:id/delete', deleteProfile)
    router.delete('/profile/driver/:userID/delete', deleteDriverProfile)

    app.use('/', router)
}
const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/auth-controller')
const validate = require('../middleware/validate-middleware')
const {
  signUpSchema,
  loginSchema,
  editProfileSchema
} = require('../validators/auth-validator')
const authMiddleware = require('../middleware/auth-middleware')

router.route('/').get(authControllers.home)

router
  .route('/register')
  .post(validate(signUpSchema), authControllers.register)

router.route('/login').post(validate(loginSchema), authControllers.login)

router.route('/user').get(authMiddleware, authControllers.user)

router.route('/change-password').put(
  // validate(changePasswordSchema),
  authMiddleware,
  authControllers.changePassword
)

router
  .route('/edit-profile')
  .put(
    validate(editProfileSchema),
    authMiddleware,
    authControllers.editProfile
  )

module.exports = router

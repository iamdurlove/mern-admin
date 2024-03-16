const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validate = require("../middleware/validate-middleware");
const {
	signUpSchema,
	loginSchema,
	editProfileSchema,
	changePasswordSchema,
	passwordResetSchema,
} = require("../validators/auth-validator");
const authMiddleware = require("../middleware/auth-middleware");

router.route("/").get(authControllers.home);

router
	.route("/register")
	.post(validate(signUpSchema), authControllers.register);

router.route("/verify/:userId/:uniqueString").get(authControllers.verify);

router.route("/login").post(validate(loginSchema), authControllers.login);

router.route("/forgot").post(authControllers.forgot);
router
	.route("/reset")
	.post(validate(passwordResetSchema), authControllers.reset);

router.route("/user").get(authMiddleware, authControllers.user);

router
	.route("/change-password")
	.put(
		validate(changePasswordSchema),
		authMiddleware,
		authControllers.changePassword
	);

router
	.route("/edit-profile")
	.put(
		validate(editProfileSchema),
		authMiddleware,
		authControllers.editProfile
	);

module.exports = router;

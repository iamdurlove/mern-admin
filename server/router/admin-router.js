const express = require("express");
const adminController = require("../controllers/admin-controller");
const validate = require("../middleware/validate-middleware");
const { userEditSchema } = require("../validators/auth-validator");
const { serviceSchema } = require("../validators/service-validator");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

//get user data using id

router
	.route("/user/:id")
	.get(authMiddleware, adminMiddleware, adminController.getUser);

// to get all users & other data
router
	.route("/users")
	.get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router
	.route("/contacts")
	.get(authMiddleware, adminMiddleware, adminController.getAllContacts);
router
	.route("/services")
	.get(authMiddleware, adminMiddleware, adminController.getAllServices);

//post datas

router
	.route("/add-service")
	.post(
		validate(serviceSchema),
		authMiddleware,
		adminMiddleware,
		adminController.postService
	);

//delete
router
	.route("/users/:id")
	.delete(authMiddleware, adminMiddleware, adminController.deleteUser);
router
	.route("/contacts/:id")
	.delete(authMiddleware, adminMiddleware, adminController.deleteContact);
router
	.route("/services/:id")
	.delete(authMiddleware, adminMiddleware, adminController.deleteService);

//edit
router
	.route("/users/:id")
	.put(
		validate(userEditSchema),
		authMiddleware,
		adminMiddleware,
		adminController.editUser
	);

module.exports = router;

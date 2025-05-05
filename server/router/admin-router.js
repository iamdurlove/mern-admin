const express = require("express");
const adminController = require("../controllers/admin-controller");
const validate = require("../middleware/validate-middleware");
const { userEditSchema } = require("../validators/auth-validator");
const {
	serviceSchema,
	editServiceSchema,
} = require("../validators/service-validator");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const upload = require("../utils/upload"); // Import upload middleware

// get single user using id
router
	.route("/user/:id")
	.get(authMiddleware, adminMiddleware, adminController.getUser);
router
	.route("/service/:id")
	.get(authMiddleware, adminMiddleware, adminController.getService);

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

// post datas
router.route("/add-service").post(
	upload.single("image"), // Add upload middleware for single image
	validate(serviceSchema),
	authMiddleware,
	adminMiddleware,
	adminController.postService
);

// delete
router
	.route("/users/:id")
	.delete(authMiddleware, adminMiddleware, adminController.deleteUser);
router
	.route("/contacts/:id")
	.delete(authMiddleware, adminMiddleware, adminController.deleteContact);
router
	.route("/services/:id")
	.delete(authMiddleware, adminMiddleware, adminController.deleteService);

// edit
router.route("/users/:id").put(
	upload.single("image"), // Add upload middleware for single image
	validate(userEditSchema),
	authMiddleware,
	adminMiddleware,
	adminController.editUser
);

router.route("/services/:id").put(
	upload.single("image"), // Add upload middleware for single image
	validate(editServiceSchema),
	authMiddleware,
	adminMiddleware,
	adminController.editService
);

module.exports = router;

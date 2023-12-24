const express = require("express");
const adminController = require("../controllers/admin-controller");
const validate = require("../middleware/validate-middleware");
const { userEditSchema } = require("../validators/auth-validator");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");

//view
router.route("/users").get(authMiddleware, adminController.getAllUsers);
router.route("/contacts").get(authMiddleware, adminController.getAllContacts);
router.route("/services").get(authMiddleware, adminController.getAllServices);

//delete
router.route("/users/:id").delete(authMiddleware, adminController.deleteUser);
router
	.route("/contacts/:id")
	.delete(authMiddleware, adminController.deleteContact);
router
	.route("/services/:id")
	.delete(authMiddleware, adminController.deleteService);

//edit
router
	.route("/users/:id")
	.put(validate(userEditSchema), authMiddleware, adminController.editUser);

module.exports = router;

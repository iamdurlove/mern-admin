const express = require("express");
const router = express.Router();
const {
	serviceController,
	singleServiceController,
} = require("../controllers/service-controller");

router.route("/service").get(serviceController);
router.route("/service/:id").get(singleServiceController);

module.exports = router;

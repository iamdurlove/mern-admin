const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service-controller");

router.route("/service").get(serviceController);

module.exports = router;

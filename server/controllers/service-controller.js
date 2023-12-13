const Service = require("../models/service-model");

const serviceController = async (req, res, next) => {
	try {
		const response = await Service.find();
		res.status(200).json(response);
	} catch (error) {
		console.log("error from the service controller: ", error);
	}
};

module.exports = serviceController;

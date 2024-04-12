const Service = require("../models/service-model");

const serviceController = async (req, res, next) => {
	try {
		const response = await Service.find();
		res.status(200).json(response);
	} catch (error) {
		console.log("error from the service controller: ", error);
	}
};

const postService = async (req, res) => {
	try {
		const data = req.body;
		const response = await Service.create(data);
		res.status(200).json(response);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { serviceController, postService };

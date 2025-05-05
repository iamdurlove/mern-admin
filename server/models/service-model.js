const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
	service: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: String, required: true },
	provider: { type: String, required: true },
	image: { type: String, required: true }, // Field to store image path
});

const Service = new model("Service", serviceSchema);

module.exports = Service;

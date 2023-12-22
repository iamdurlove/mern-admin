const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Service = require("../models/service-model");

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({}, { password: 0 });
		if (!users || users.length === 0)
			return res.status(404).json({ message: "No users found" });
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
	}
};
const getAllContacts = async (req, res) => {
	try {
		const contacts = await Contact.find();
		if (!contacts || contacts.length === 0)
			return res.status(404).json({ message: "No contacts found" });
		res.status(200).json(contacts);
	} catch (error) {
		console.error(error);
	}
};
const getAllServices = async (req, res) => {
	try {
		const services = await Service.find();
		if (!services || services.length === 0)
			return res.status(404).json({ message: "No services found" });
		res.status(200).json(services);
	} catch (error) {
		console.error(error);
	}
};

module.exports = { getAllUsers, getAllContacts, getAllServices };

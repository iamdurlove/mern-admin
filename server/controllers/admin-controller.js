const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Service = require("../models/service-model");

const getAllUsers = async (req, res) => {
	try {
		const { isAdmin, email } = req.user;
		// console.log(isAdmin);
		if (!isAdmin)
			return res.status(404).json({ message: "Unauthorized access" });
		const users = await User.find({ email: { $ne: email } }, { password: 0 });
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

const deleteUser = async (req, res) => {
	try {
		const id = req.body.id;
		const deleteUser = await User.deleteOne({ id });
		if (deleteUser.deletedCount === 1)
			return res.status(200).json({ message: "User deleted successfully" });
		else return res.status(404).json({ error: "User not found" });
	} catch (error) {
		console.error(error);
	}
};

const deleteContact = async (req, res) => {
	try {
		const id = req.body.id;
		const deleteContact = await Contact.deleteOne({ id });
		if (deleteContact.deletedCount === 1)
			return res.status(200).json({ message: "Contact deleted successfully" });
		else return res.status(404).json({ error: "Contact not found" });
	} catch (error) {
		console.error(error);
	}
};

const deleteService = async (req, res) => {
	try {
		const id = req.body.id;
		const deleteService = await Service.deleteOne({ id });
		if (deleteService.deletedCount === 1)
			return res.status(200).json({ message: "Service deleted successfully" });
		else return res.status(404).json({ error: "Service not found" });
	} catch (error) {
		console.error(error);
	}
};

const editUser = async (req, res) => {
	try {
		const userId = req.params.id;
		const updatedData = req.body;

		const user = await User.findById(userId);

		const emailExist = await User.findOne({ email: user.email });
		const userExist = await User.findOne({ username: user.username });

		if (userExist || emailExist)
			return res.status(400).json({ message: "User already exists" });

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Update user data
		user.username = updatedData.username;
		user.email = updatedData.email;
		user.phone = updatedData.phone;

		await user.save();

		return res
			.status(200)
			.json({ message: "User updated successfully", data: user });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	getAllUsers,
	getAllContacts,
	getAllServices,
	deleteUser,
	deleteContact,
	deleteService,
	editUser,
};

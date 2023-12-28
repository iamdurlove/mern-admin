const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Service = require("../models/service-model");

const getAllUsers = async (req, res) => {
	try {
		// to get the email of loggedIn User
		const id = req.user.id;
		// console.log(id);
		const users = await User.find({ _id: { $ne: id } }).select("-password");
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
		const id = req.params.id;
		const deleteUser = await User.findOneAndDelete({ _id: id });
		console.log(deleteUser);
		if (deleteUser)
			return res.status(200).json({ message: "User deleted successfully" });
		else return res.status(404).json({ error: "User not found" });
	} catch (error) {
		console.error(error);
	}
};

const deleteContact = async (req, res) => {
	try {
		const id = req.params.id;
		const deleteContact = await Contact.findOneAndDelete({ _id: id });
		if (deleteContact)
			return res.status(200).json({ message: "Contact deleted successfully" });
		else return res.status(404).json({ error: "Contact not found" });
	} catch (error) {
		console.error(error);
	}
};

const deleteService = async (req, res) => {
	try {
		const id = req.params.id;
		// console.log(id);
		const deleteService = await Service.findOneAndDelete({ _id: id });
		// console.log(deleteService);
		if (deleteService)
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

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Check if any field is updated
		const isUpdated = Object.keys(updatedData).some(
			(key) => user[key] !== updatedData[key]
		);

		// console.log(isUpdated);

		if (!isUpdated) {
			return res
				.status(400)
				.json({ message: "At least one field should be updated" });
		}

		// Update user data
		user.username = updatedData.username || user.username;
		user.email = updatedData.email || user.email;
		user.phone = updatedData.phone || user.phone;
		user.password = updatedData.password || user.password;
		user.isAdmin =
			updatedData.isAdmin !== undefined ? updatedData.isAdmin : user.isAdmin;

		// checking if the updated email already exists
		const email = user.email;

		const emailExist = await User.findOne({
			email,
			_id: { $ne: userId },
		});

		if (emailExist)
			return res.status(400).json({ message: "User already exists" });

		const data = await user.save();

		return res.status(200).json({ message: "User updated successfully", data });
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

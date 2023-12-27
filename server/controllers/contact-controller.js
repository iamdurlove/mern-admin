const Contact = require("../models/contact-model");

const contact = async (req, res) => {
	try {
		const response = req.body;
		// console.log(response);
		await Contact.create(response);
		return res.status(200).json({ msg: "message sent successfully" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "message not sent" });
	}
};

module.exports = contact;

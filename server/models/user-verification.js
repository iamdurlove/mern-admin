const mongoose = require("mongoose");

const userVerificationSchema = new mongoose.Schema({
	userId: {
		type: String,
	},
	uniqueString: {
		type: String,
		unique: true,
	},
	createdAt: {
		type: Date,
	},
	expiresAt: {
		type: Date,
	},
});

const UserVerification = new mongoose.model(
	"UserVerification",
	userVerificationSchema
);

module.exports = UserVerification;

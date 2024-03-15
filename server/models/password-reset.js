const mongoose = require("mongoose");

// Remove the invalid regular expression syntax
const passwordResetSchema = new mongoose.Schema({
	userId: {
		type: String,
	},
	resetString: {
		type: String,
	},
	createdAt: {
		type: Date,
	},
	expiresAt: {
		type: Date,
	},
});

const PasswordReset = mongoose.model("PasswordReset", passwordResetSchema);

module.exports = PasswordReset;

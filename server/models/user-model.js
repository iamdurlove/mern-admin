const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
	},
	email: {
		type: String,
		unique: true,
	},
	phone: {
		type: String,
	},
	password: {
		type: String,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

//securing the password field
userSchema.pre("save", async function (next) {
	// this.password = bcrypt.hashSync(this.password, 10);
	const user = this;
	if (!user.isModified("password")) next();
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(user.password, salt);
		user.password = hashedPassword;
	} catch (error) {
		next(error);
	}
});

// json web token

const secret = process.env.JWT_SECRET;

userSchema.methods.generateToken = async function () {
	try {
		const user = this;
		const token = jwt.sign(
			{ _id: user._id.toString(), email: user.email, isAdmin: user.isAdmin },
			secret,
			{ expiresIn: "30d" }
		);
		return token;
	} catch (error) {
		console.log(error);
	}
};

userSchema.methods.comparePassword = async function (password) {
	try {
		const user = this;
		const isMatch = await bcrypt.compare(password, user.password);
		return isMatch;
	} catch (error) {
		console.log(error);
	}
};

const User = new mongoose.model("User", userSchema);

module.exports = User;

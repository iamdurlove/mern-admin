const User = require("../models/user-model");

const home = async (req, res) => {
	try {
		res.status(200).send("Welcome to the home page with controller");
	} catch (error) {
		console.log(error);
	}
};

const register = async (req, res) => {
	try {
		const { username, email, phone, password } = req.body;
		const emailExist = await User.findOne({ email });
		// const userExist = await User.findOne({ username });

		if (emailExist)
			return res.status(400).json({ message: "User already exists" });

		const userCreated = await User.create({ email, username, phone, password });
		res.status(200).json({
			msg: "success",
			token: await userCreated.generateToken(),
			userId: userCreated._id.toString(),
		});
	} catch (error) {
		res.send(500).json("internal server error");
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const userExist = await User.findOne({ email });
		if (!userExist) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		// const isMatch = await bcrypt.compare(password, userExist.password);
		const isMatch = await userExist.comparePassword(password);
		if (!isMatch)
			return res.status(401).json({ message: "Invalid Credentials" });
		res.status(200).json({
			msg: "success",
			token: await userExist.generateToken(),
			userId: userExist._id.toString(),
		});
	} catch (error) {
		console.log("login error: " + error);
		res.status(500).json("internal server error");
	}
};

//user data send using user route

const user = async (req, res) => {
	try {
		const userData = req.user;
		// console.log(userData);
		res.status(200).json({ userData });
	} catch (error) {}
};

const changePassword = async (req, res) => {
	const newPassword = req.body.newPassword;
	const data = req.user;
	const id = data.id;

	// console.log("from frontend", newPassword);

	const user = await User.findById(id).select("-password");

	user.password = newPassword;

	const result = await user.save();

	console.log(result);

	if (!result)
		res
			.status(404)
			.json({ message: "Internal Server Error, please try again" });

	res.status(200).json({ message: "Password changed successfully", data });
};

module.exports = { home, register, login, user, changePassword };

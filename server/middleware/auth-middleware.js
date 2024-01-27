const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
	const token = req.header("Authorization");
	if (!token) {
		return res
			.status(401)
			.json({ message: "Unauthorized aceess. No token provided" });
	}
	const jwtToken = token.replace("Bearer", "").trim();
	try {
		const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);

		// Check the user's status in the database (if deleted after successful authentication or banned)
		const userData = await User.findOne({ email: isVerified.email }).select({
			password: 0,
		});

		if (!userData) {
			return res
				.status(401)
				.json({ message: "Unauthorized - User doesn't exist" });
		}

		req.user = userData;
		req.token = token;
		req.userID = userData._id;
		next();
	} catch (error) {
		// console.log('JWT Unverified')
		return res
			.status(401)
			.json({ message: "Unauthorized - User doesn't exist" });
	}
};

module.exports = authMiddleware;

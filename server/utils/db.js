const mongoose = require("mongoose");

const URI = "mongodb://127.0.0.1:27017/mern_admin";

const onlineURI = process.env.MONGODB_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(onlineURI);
		console.log("connected to database");
	} catch (error) {
		console.log("connection failed", error);
		process.exit(0);
	}
};

module.exports = connectDB;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");

const corsOptions = {
	origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(",") : [],
	methods: ["GET", "HEAD", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
	credentials: true,
};

const os = require("os");
const hostaddress = os.hostname();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);
app.get("/", (req, res) => {
	res.json({
		message: "Server online",
		developer: "Durlav Parajuli",
		device: hostaddress,
		network: req.ip,
		osVersion: os.release(),
		osPlatform: os.platform(),
		uptime: parseInt(os.uptime()) + " seconds",
		user: os.userInfo(),
	});
});

app.use(errorMiddleware);

connectDB().then(() => {
	app.listen(process.env.PORT, () => {
		console.log(`server is running at port: ${process.env.PORT}`);
	});
});

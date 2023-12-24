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
	origin: ["http://localhost:5173", "http://localhost:4173"],
	methods: ["GET", "HEAD", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
	credientials: true,
};

var os = require("os");
var hostaddress = os.hostname();

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
		network: req.connection.remoteAddress,
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

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
	origin: "http://localhost:5173",
	methods: ["GET", "HEAD", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
	credientials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);
app.get("/", (req, res) => {
	res.json({ msg: "connection established" });
});

app.use(errorMiddleware);

connectDB().then(() => {
	app.listen(process.env.PORT, () => {
		console.log(`server is running at port: ${process.env.PORT}`);
	});
});

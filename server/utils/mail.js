import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

export const sendUserEmail = async (email) => {
	const mailOptions = {
		from: process.env.MAIL_USERNAME,
		to: email,
		subject: "User Registration Successful",
		html: `<p>Thankyou for registration!</p>`,
	};

	const transporter = nodemailer.createTransport({
		host: process.env.MAIL_SERVER,
		port: process.env.MAIL_PORT,
		secure: true, // true for port 465, false for other ports
		auth: {
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD,
		},
	});

	try {
		const sendMail = await transporter.sendMail(mailOptions);
		if (sendMail) {
			console.log("Email sent successfully", sendMail);
		}
	} catch (err) {
		console.log("send error", err);
	}
};

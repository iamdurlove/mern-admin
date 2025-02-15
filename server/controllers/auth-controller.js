const User = require("../models/user-model");
const UserVerification = require("../models/user-verification");
const PasswordReset = require("../models/password-reset");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const path = require("node:path");

require("dotenv").config();

//unique string
const { v4: uuidv4 } = require("uuid");

//nodemailer setup
let transporter = nodemailer.createTransport({
	host: process.env.MAIL_SERVER,
	port: process.env.MAIL_PORT,
	secure: true,
	auth: {
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD,
	},
});

//testing email success
transporter.verify((error, success) => {
	if (error) console.log(error);
	else {
		console.log("Ready for message");
		console.log(success);
	}
});

const home = async (req, res) => {
	try {
		res.status(200).send("Welcome to the home page with controller");
	} catch (error) {
		console.log(error);
	}
};

// send verification email

const register = async (req, res) => {
	const sendVerificationEmail = ({ _id, email }, res) => {
		//to get the current url
		const url = new URL(
			`${req.protocol}://${req.get("host")}${req.originalUrl}`
		);
		const currentURL = url.origin;
		const uniqueString = uuidv4() + _id;

		//mail options
		const mailOptions = {
			from: process.env.MAIL_USERNAME,
			to: email,
			subject: "Verify Your Email",
			html: `<p>Verify your email address to complete the registration</p>
            <p><b>This link expires in 6 hours</b></p>
            <p>Click here to verify</p>
            <p><a href=${
							currentURL + "/api/auth/verify/" + _id + "/" + uniqueString
						}>Verify Now</a></p>`,
		};

		const saltRounds = 10;
		bcrypt
			.hash(uniqueString, saltRounds)
			.then((hashedUniqueString) => {
				const newVerification = new UserVerification({
					userId: _id,
					uniqueString: hashedUniqueString,
					createdAt: Date.now(),
					expiresAt: Date.now() + 21600000,
				});

				newVerification
					.save()
					.then(() => {
						transporter.sendMail(mailOptions);
						// .then(() => {
						// 	res.json({
						// 		status: "pending",
						// 		message: "verification email sent",
						// 	});
						// })
						// .catch((error) => {
						// 	console.log(error);
						// 	res.json({
						// 		status: "failed",
						// 		message: "verification email failed",
						// 	});
						// });
					})
					.catch((error) => {
						console.log(error);
						res.json({ status: "failed", message: error });
					});
			})
			.catch((error) => {
				res.json({ status: "failed", message: error });
			});
	};

	try {
		const { username, email, phone, password } = req.body;
		const emailExist = await User.findOne({ email });
		// const userExist = await User.findOne({ username });

		if (emailExist) {
			return res.status(400).json({ message: "User already exists" });
		}

		const userCreated = await User({
			email,
			username,
			phone,
			password,
		});

		userCreated.save().then((result) => {
			//handle account verification
			sendVerificationEmail(result, res);
		});

		res.status(200).json({
			msg: "success, please verify email",
			// token: await userCreated.generateToken(),
			userId: userCreated._id.toString(),
		});
	} catch (error) {
		res.send(500).json("internal server error");
	}
};

const verify = (req, res) => {
	let { userId, uniqueString } = req.params;
	UserVerification.find({ userId }).then((result) => {
		if (result.length > 0) {
			//user verification exists
			const { expiresAt } = result[0];
			const hashedUniqueString = result[0].uniqueString;
			if (expiresAt < Date.now()) {
				UserVerification.deleteOne({ userId })
					.then((result) => {
						User.deleteOne({ _id: userId })
							.then(() => {
								let message = "link expired";
								return res.status(400).json({ message });
							})
							.catch((error) => {
								console.log(error);
							});
					})
					.catch((error) => {
						console.log(error);
						let message = "link expired";
						return res.status(400).json({ message });
					});
			} else {
				// valid record exist so we validate the user string
				bcrypt
					.compare(uniqueString, hashedUniqueString)
					.then((isMatch) => {
						if (isMatch) {
							User.updateOne({ _id: userId }, { isVerified: true })
								.then(() => {
									UserVerification.deleteOne({ userId })
										.then(() => {
											res.sendFile(
												path.join(__dirname, "../views/verified.html")
											);
											// const userVerified = User.findOne({ userId });
											// res.status(200).json({
											// 	msg: "verification successful",
											// 	token: userVerified.generateToken(),
											// 	userId: userVerified._id.toString(),
											// });
										})
										.catch((error) => {
											console.log(error);
											let message = "error occured to verify user in final";
											return res.status(400).json({ message });
										});
								})
								.catch((error) => {
									let message = "error occured to verify user";
									return res.status(400).json({ message });
								});
						} else {
							let message = "invalid verification details passed";
							return res.status(400).json({ message });
						}
					})
					.catch((err) => {
						console.log(err);
						let message = "error while comparing hash";
						return res.status(400).json({ message });
					});
			}
		} else {
			//user verification does not exist
			let message = "user verification doesn't exist";
			return res.status(400).json({ message });
		}

		const hashedUniqueString = result[0].uniqueString;
		bcrypt
			.compare(uniqueString, hashedUniqueString)
			.then((isMatch) => {
				if (isMatch) {
					User.findByIdAndUpdate(userId, { isVerified: true });
				} else {
					let message = "Account record doesn't exist or been verified already";
					return res.status(400).json({ message });
				}
			})
			.catch((error) => {
				console.error(error);
				let message = "An error occured";
				return res.status(400).json({ message });
			});
	});
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
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid Credentials" });
		}
		if (userExist.isVerified === false) {
			return res.status(400).json({ message: "Pending verification" });
		} else {
			res.status(200).json({
				msg: "success",
				token: await userExist.generateToken(),
				userId: userExist._id.toString(),
			});
		}
	} catch (error) {
		console.log("login error: " + error);
		res.status(500).json("internal server error");
	}
};

// user data send using user route

const user = async (req, res) => {
	try {
		const userData = req.user;
		// console.log(userData);
		res.status(200).json({ userData });
	} catch (error) {}
};

const forgot = async (req, res) => {
	const { email } = req.body;
	const userData = await User.findOne({ email }).select("-password");
	// console.log(userData);
	if (!userData) res.status(400).json({ message: "User doesn't exist" });
	else if (!userData.isVerified)
		res
			.status(400)
			.json({ message: "pending email verification for the user" });
	else {
		const resetString = uuidv4() + userData._id;

		PasswordReset.deleteMany({ userId: userData._id })
			.then((result) => {
				const mailOptions = {
					from: process.env.MAIL_USERNAME,
					to: email,
					subject: "Reset your password",
					html: `<p>Click here to reset your password</p>
					
					<p>This link expires in 60 minutes</p>
					<p><a href=${
						process.env.CLIENT_URL +
						"/reset?id=" +
						userData._id +
						"&token=" +
						resetString
					}>Reset Now</a></p>
					`,
				};

				const saltRounds = 10;
				bcrypt
					.hash(resetString, saltRounds)
					.then((hashedResetString) => {
						const newResetData = new PasswordReset({
							userId: userData._id,
							resetString: hashedResetString,
							createdAt: Date.now(),
							expiresAt: Date.now() + 3600000,
						});
						const saveResetData = newResetData.save();
						if (!newResetData)
							res
								.status(400)
								.json({ message: "failed to create reset data in database" });
						else {
							transporter
								.sendMail(mailOptions)
								.then((data) => {
									console.log("Email sent successfully", data);
									res
										.status(200)
										.json({ message: "reset link sent to the email" });
								})
								.catch((error) => {
									console.log(error);
									res
										.status(400)
										.json({ message: "error sending the reset link mail" });
								});
						}
					})
					.catch((error) => {
						console.log(error);
						res.status(400).json({ message: "error hashing the reset data" });
					});
			})
			.catch((error) => {
				console.log(error);
				res.status(400).json({ message: "error deleting previous reset data" });
			});
	}
};

const reset = (req, res) => {
	let { userId, resetString, newPassword } = req.body;
	PasswordReset.find({ userId })
		.then((result) => {
			if (result.length > 0) {
				const { expiresAt } = result[0];
				const hashedResetString = result[0].resetString;
				if (expiresAt < Date.now()) {
					PasswordReset.deleteOne({ userId })
						.then(() => {
							res.status(400).json({ message: "Reset link expired" });
						})
						.catch((error) => {
							console.log(error);
							res
								.status(400)
								.json({ message: "error resetting previous data " });
						});
				} else {
					bcrypt
						.compare(resetString, hashedResetString)
						.then((isMatch) => {
							if (isMatch) {
								const saltRounds = 10;
								bcrypt
									.hash(newPassword, saltRounds)
									.then((newHashedPassword) => {
										User.updateOne(
											{ _id: userId },
											{ password: newHashedPassword }
										)
											.then(() => {
												PasswordReset.deleteOne({ userId })
													.then(() => {
														res
															.status(200)
															.json({ message: "password reset successful" });
													})
													.catch((error) => {
														console.log(error);
														res
															.status(400)
															.json({ message: "error deleting reset data" });
													});
											})
											.catch((error) => {
												console.log(error);
												res
													.status(400)
													.json({ message: "updating user password failed" });
											});
									})
									.catch((error) => {
										console.log(error);
										res
											.status(400)
											.json({ message: "error hashing the new password" });
									});
							} else {
								res.status(400).json({ message: "Invalid reset data" });
							}
						})
						.catch((error) => {
							console.log(error);
							res.status(400).json({ message: "error comparing reset data" });
						});
				}
			} else {
				res.status(400).json({ message: "No reset data found" });
			}
		})
		.catch((error) => {
			console.error(error);
			res.status(400).json({ message: "error checking existing reset data" });
		});
};

const changePassword = async (req, res) => {
	const newPassword = req.body.password;
	const userId = req.user.id;

	try {
		// Retrieve user by ID
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Update user's password directly
		user.password = newPassword;

		// Save the updated user (assuming the hash is handled internally in the save method of the User model)
		await user.save();

		res.status(200).json({ message: "Password changed successfully" });
	} catch (error) {
		console.error("Error changing password:", error);
		res
			.status(500)
			.json({ message: "Internal Server Error, please try again" });
	}
};

const editProfile = async (req, res) => {
	try {
		const userId = req.user.id;
		const updatedData = req.body;
		const user = await User.findById(userId);

		// Check if any field is updated
		const isUpdated = Object.keys(updatedData).some(
			(key) => user[key] !== updatedData[key]
		);

		// console.log(isUpdated);

		if (!isUpdated) {
			return res
				.status(400)
				.json({ message: "At least one field should be updated" });
		}

		// Update user data
		user.username = updatedData.username || user.username;
		user.email = updatedData.email || user.email;
		user.phone = updatedData.phone || user.phone;

		// checking if the updated email already exists
		const email = user.email;

		const emailExist = await User.findOne({
			email,
			_id: { $ne: userId },
		});

		if (emailExist) {
			return res.status(400).json({ message: "User already exists" });
		}

		const data = await user.save();

		return res.status(200).json({ message: "User updated successfully", data });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	home,
	register,
	verify,
	login,
	user,
	forgot,
	reset,
	changePassword,
	editProfile,
};

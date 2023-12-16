const { z } = require("zod");

const signUpSchema = z.object({
	username: z
		.string({ required_error_: "username is required" })
		.trim()
		.min(3, { message: "username must be least 3 characters" })
		.max(255, { message: "username must be max 256 characters" }),

	email: z
		.string({ required_error_: "email is required" })
		.trim()
		.min(8, { message: "email must be least 8 characters" })
		.max(255, { message: "email must be max 256 characters" }),

	phone: z
		.string({ required_error_: "phone no is required" })
		.trim()
		.min(10, { message: "phone no must be least 3 characters" })
		.max(13, { message: "username must be max 13 characters" }),

	password: z
		.string({ required_error_: "password is required" })
		.trim()
		.min(6, { message: "password must be least 6 characters" })
		.max(1024, { message: "password must be max 1024 characters" }),
});

const loginSchema = z.object({
	email: z
		.string({ required_error_: "email is required" })
		.trim()
		.min(8, { message: "email must be least 8 characters" })
		.max(255, { message: "email must be max 256 characters" }),

	password: z
		.string({ required_error_: "password is required" })
		.trim()
		.min(6, { message: "password must be least 6 characters" })
		.max(1024, { message: "password must be max 1024 characters" }),
});

module.exports = { signUpSchema, loginSchema };

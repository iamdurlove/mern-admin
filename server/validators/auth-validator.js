const { z } = require("zod");

const signUpSchema = z.object({
	username: z
		.string({ required_error: "username is required" })
		.trim()
		.min(3, { message: "username must be least 3 characters" })
		.max(255, { message: "username must be max 256 characters" }),

	email: z
		.string({ required_error: "email is required" })
		.trim()
		.min(8, { message: "email must be least 8 characters" })
		.max(255, { message: "email must be max 256 characters" }),

	phone: z
		.string({ required_error: "phone no is required" })
		.trim()
		.min(8, { message: "phone no must be least 8 characters" })
		.max(10, { message: "phone must be max 10 characters" }),

	password: z
		.string({ required_error: "password is required" })
		.trim()
		.min(6, { message: "password must be least 6 characters" })
		.max(1024, { message: "password must be max 1024 characters" }),
});
const userEditSchema = z.object({
	username: z
		.string({ required_error: "username is required" })
		.trim()
		.min(3, { message: "username must be least 3 characters" })
		.max(255, { message: "username must be max 256 characters" })
		.optional(),

	email: z
		.string({ required_error: "email is required" })
		.trim()
		.min(8, { message: "email must be least 8 characters" })
		.max(255, { message: "email must be max 256 characters" })
		.optional(),

	phone: z
		.string({ required_error: "phone no is required" })
		.trim()
		.min(8, { message: "phone no must be least 8 characters" })
		.max(10, { message: "phone no must be max 13 characters" })
		.optional(),
	password: z
		.string({ required_error: "password is required" })
		.trim()
		.min(6, { message: "password must be least 6 characters" })
		.max(1024, { message: "password must be max 1024 characters" })
		.optional(),
	isAdmin: z
		.boolean({ required_error: "Admin access property is required" })
		.optional(),
});

const loginSchema = z.object({
	email: z
		.string({ required_error: "email is required" })
		.trim()
		.min(8, { message: "email must be least 8 characters" })
		.max(255, { message: "email must be max 256 characters" }),

	password: z
		.string({ required_error: "password is required" })
		.trim()
		.min(6, { message: "password must be least 6 characters" })
		.max(1024, { message: "password must be max 1024 characters" }),
});

const passwordChangeSchema = z.object({
	password: z
		.string({ required_error: "password is required" })
		.trim()
		.min(6, { message: "password must be least 6 characters" })
		.max(1024, { message: "password must be max 1024 characters" }),
});

const editProfileSchema = z.object({
	username: z
		.string({ required_error: "username is required" })
		.trim()
		.min(4, { message: "username must be least 4 characters" })
		.max(255, { message: "username must be max 256 characters" })
		.optional(),
	email: z
		.string({ required_error: "email is required" })
		.trim()
		.min(8, { message: "email must be least 8 characters" })
		.max(255, { message: "email must be max 256 characters" })
		.optional(),

	phone: z
		.string({ required_error: "phone no is required" })
		.trim()
		.min(8, { message: "phone no must be least 8 characters" })
		.max(10, { message: "phone no must be max 10 characters" })
		.optional(),
});

module.exports = {
	signUpSchema,
	loginSchema,
	userEditSchema,
	passwordChangeSchema,
	editProfileSchema,
};

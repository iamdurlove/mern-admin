const validate = (schema) => async (req, res, next) => {
	try {
		console.log(req.body);
		const parseBody = await schema.parseAsync(req.body);
		req.body = parseBody;

		next();
	} catch (err) {
		const status = 422;
		const message = "User Input Error";
		console.log("Validation Error: ", err);
		const extraDetails = err.errors[0].message;

		const error = {
			status,
			message,
			extraDetails,
		};
		// res.status(400).json({ status: "validation error", message });
		next(error);
	}
};

module.exports = validate;

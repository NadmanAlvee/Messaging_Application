const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const User = require("../../models/People");
const { unlink } = require("fs");

const addUserValidators = [
	check("name")
		.isLength({ min: 1 })
		.withMessage("Name is required")
		.isAlpha("en-US", { ignore: " -" })
		.withMessage("Name must not contain anything other than alphabet")
		.trim(),
	check("email")
		.isEmail()
		.withMessage("Invalid email address")
		.trim()
		.custom(async (value) => {
			try {
				const user = await User.findOne({ email: value });
				if (user) {
					throw createError("Email already in use!");
				}
			} catch (err) {
				throw createError(err.message);
			}
		}),
	check("mobile")
		.isMobilePhone("bn-BD", { strictMode: true })
		.withMessage("Must be a valid Bangladeshi Mobile Number")
		.trim()
		.custom(async (value) => {
			try {
				const user = await User.findOne({ mobile: value });
				if (user) {
					throw createError("Mobile already in use!");
				}
			} catch (err) {
				throw createError(err.message);
			}
		}),
	check("password")
		.isStrongPassword()
		.withMessage(
			"Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
		),
];

const addUservalidationHandler = function (req, res, next) {
	const errors = validationResult(req);
	const mappedErrors = errors.mapped();

	if (Object.keys(mappedErrors).length === 0) {
		next();
	} else {
		// Delete uploaded file(s) if validation fails
		if (req.file) {
			// Single file upload
			unlink(
				path.join(
					__dirname,
					`../../public/uploads/avatars/${req.file.filename}`
				),
				(err) => {
					if (err) console.log("Error deleting file:", err);
				}
			);
			console.log("file deleted");
		} else if (req.files && req.files.length > 0) {
			// Multiple files
			req.files.forEach((file) => {
				unlink(
					path.join(__dirname, `../../public/uploads/avatars/${file.filename}`),
					(err) => {
						if (err) console.log("Error deleting file:", err);
					}
				);
			});
			console.log("file deleted [0]");
		}

		// Send validation errors as response
		res.status(400).json({
			errors: mappedErrors,
		});
	}
};

module.exports = {
	addUserValidators,
	addUservalidationHandler,
};

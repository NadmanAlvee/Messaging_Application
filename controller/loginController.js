// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internalimports
const User = require("../models/People");

// get login page
function getLogin(req, res, next) {
	res.render("index");
}

// do login
async function login(req, res, next) {
	// login process
	try {
		// find a user with this email or username
		const user = await User.findOne({
			$or: [{ email: req.body.username }, { mobile: req.body.username }],
		});
		if (user && user._id) {
			const isValidPassword = await bcrypt.compare(
				req.body.password,
				user.password
			);
			// prepare token if password is correct
			if (isValidPassword) {
				// token
				const userObject = {
					username: user.name,
					mobile: user.mobile,
					email: user.email,
					role: "user",
				};

				// generate token
				const token = jwt.sign(userObject, process.env.JWT_SECRET, {
					expiresIn: process.env.JWT_EXPIRY,
				});

				// set cookie
				res.cookie(process.env.COOKIE_NAME, token, {
					maxAge: 86400000,
					httpOnly: true,
					signed: true,
				});
				// logged in user local identifier
				res.locals.loggedInUser = userObject;

				// render inbox
				res.render("inbox");
			} else {
				throw createError("Login failed! Please try again.");
			}
		} else {
			throw createError("Login failed! Please try again.");
		}
	} catch (err) {
		res.render("index", {
			data: {
				username: req.body.username,
			},
			errors: {
				common: {
					msg: err.message,
				},
			},
		});
	}
}

// DO LOGOUT
function logout(req, res) {
	res.clearCookie(process.env.COOKIE_NAME);
	// res.redirect("/").end();
	res.send("logged out");
}

module.exports = {
	getLogin,
	login,
	logout,
};

// external imports
const bcrypt = require("bcrypt");
const path = require("path");
const { unlink } = require("fs");

// internal imports
const User = require("../models/People");

// get users page
async function getUsers(req, res, next) {
	try {
		const users = await User.find();
		res.render("users", {
			users: users,
		});
	} catch (err) {
		next(err);
	}
}

// add user controller
async function addUser(req, res, next) {
	try {
		let newUser;
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		if (req.files && req.files.length > 0) {
			newUser = new User({
				...req.body,
				avatar: req.files[0].filename,
				password: hashedPassword,
			});

			const result = await newUser.save();

			res.status(200).json({
				message: "User added successfully",
			});
		} else {
			newUser = new User({
				...req.body,
				password: hashedPassword,
			});
			const result = await newUser.save();
			res.status(200).json({
				message: "User added successfully",
			});
		}
	} catch (err) {
		res.status(500).json({
			errors: {
				common: {
					msg: "Unknown error occurred!",
				},
			},
		});
	}
}

// remove user
async function removeUser(req, res, next) {
	try {
		const user = await User.findByIdAndDelete({
			_id: req.params.id,
		});

		// remove user avatar
		if (user.avatar) {
			unlink(
				path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
				(err) => {
					if (err) console.log(err);
				}
			);
		}

		res.status(200).json({
			message: "User was removed successfully!",
		});
	} catch (err) {
		res.status(500).json({
			errors: {
				common: {
					msg: "Could not delete the user!",
				},
			},
		});
	}
}

module.exports = {
	getUsers,
	addUser,
	removeUser,
};

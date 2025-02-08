// external imports
const bcrypt = require("bcrypt");

// get users page
function getUsers(req, res, next) {
	res.render("users");
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
			res.status(400).json({
				errors: {
					common: {
						msg: "No file uploaded!",
					},
				},
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

module.exports = {
	getUsers,
	addUser,
};

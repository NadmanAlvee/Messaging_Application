// external imports
const bcrypt = require("bcrypt");

// get users page
function getUsers(req, res, next) {
	res.render("users");
}

// add user controller
async function addUser(req, res, next) {
	let newUser;
	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	if (req.files && req.files.length > 0) {
		newUser = new User({
			...req.body,
			avatar: req.files[0].filename,
			password: hashedPassword,
		});
	}
}

// save users or send error
try {
	const result = await newUser.save();
	res.status(200).json({
		message: "User added sucessfully",
	});
} catch (err) {
	res.status(500).json({
		errors: {
			common: {
				msg: "Unknown error occured!",
			},
		},
	});
}

module.exports = {
	getUsers,
	addUser,
};

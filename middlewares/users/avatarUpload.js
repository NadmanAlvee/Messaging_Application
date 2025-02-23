const uploader = require("../../utilities/singleUploader");

function avatarUpload(req, res, next) {
	uploader(
		"avatars",
		["image/jpeg", "image/jpg", "image/png"],
		10000000,
		"Only .jpg, .jpeg or .png format allowed"
	).any()(req, res, (err) => {
		if (err) {
			res.status(500).json({
				errors: {
					avatar: {
						msg: err.message,
					},
				},
			});
		} else {
			next();
		}
	});
}

module.exports = avatarUpload;

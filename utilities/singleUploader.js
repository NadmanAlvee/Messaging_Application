const multer = require("multer");
const path = require("path");

function uploader(
	subfolder_path,
	allowed_file_types,
	max_file_size,
	error_msg
) {
	// file upload destination
	const upload_folder = `${__dirname}/../public/uploads/${subfolder_path}/`;
	// define the storage
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, upload_folder);
		},
		fileName: (req, file, cb) => {
			const fileExt = path.extname(file.originalname);
			const fileName =
				file.originalname
					.replace(fileExt, "")
					.toLowerCase()
					.split(" ")
					.join("-") +
				"-" +
				Date.now();

			cb(null, fileName + fileExt);
		},
	});

	const upload = multer({
		storage: storage,
		limits: {
			fileSize: max_file_size,
		},
		fileFilter: (req, file, cb) => {
			if (allowed_file_types.includes(file.mimetype)) {
				cb(null, true);
			} else {
				cb(createError(error_msg));
			}
		},
	});

	return upload;
}

module.exports = uploader;

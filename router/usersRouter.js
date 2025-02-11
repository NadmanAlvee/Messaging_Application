// external imports
const express = require("express");
// external imports
const {
	getUsers,
	addUser,
	removeUser,
} = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
	addUserValidators,
	addUservalidationHandler,
} = require("../middlewares/users/userValidators");

// configs
const router = express.Router();

// users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

// add user
router.post(
	"/",
	avatarUpload,
	addUserValidators,
	addUservalidationHandler,
	addUser
);
// remove user
router.delete("/:id", removeUser);

module.exports = router;

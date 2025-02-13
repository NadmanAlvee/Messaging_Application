// external imports
const express = require("express");

// external imports
const { getLogin, login } = require("../controller/loginController");
const {
	doLoginValidators,
	doLoginValidationHandler,
} = require("../middlewares/login/loginValidators");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

// configs
const router = express.Router();
const page_title = "Login";

// login page
router.get("/", decorateHtmlResponse(page_title), getLogin);

// process login
router.post(
	"/",
	decorateHtmlResponse(page_title),
	doLoginValidators,
	doLoginValidationHandler,
	login
);

module.exports = router;

// external imports
const express = require("express");

// external imports
const { getLogin, login, logout } = require("../controller/loginController");
const {
	doLoginValidators,
	doLoginValidationHandler,
} = require("../middlewares/login/loginValidators");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
	checkLogin,
	redirectLoggedIn,
} = require("../middlewares/common/checkLogin");

// configs
const router = express.Router();
const page_title = "Login";

// login page
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

// process login
router.post(
	"/",
	decorateHtmlResponse(page_title),
	doLoginValidators,
	doLoginValidationHandler,
	login,
	(req, res, next) => {
		console.log(req.signedCookies);
		next();
	}
);

// logout url
router.delete("/", logout);

module.exports = router;

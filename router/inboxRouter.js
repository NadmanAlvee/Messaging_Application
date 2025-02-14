// external imports
const express = require("express");

// external imports
const { getInbox } = require("../controller/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
	checkLogin,
	redirectLoggedIn,
} = require("../middlewares/common/checkLogin");

// configs
const router = express.Router();

// login page
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

module.exports = router;

// external imports
const express = require("express");

// external imports
const { getInbox } = require("../controller/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

// configs
const router = express.Router();

// login page
router.get("/", decorateHtmlResponse("Inbox"), getInbox);

module.exports = router;

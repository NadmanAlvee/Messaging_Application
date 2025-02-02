// external imports
const express = require("express");

// external imports
const { getLogin } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

// configs
const router = express.Router();

// login page
router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;

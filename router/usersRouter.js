// external imports
const express = require("express");

// external imports
const { getUsers } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

// configs
const router = express.Router();

// login page
router.get("/", decorateHtmlResponse("Users"), getUsers);

module.exports = router;

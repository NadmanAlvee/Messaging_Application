// library imports
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// internel imports
const {
	errorHandler,
	notFoundHandler,
} = require("./middlewares/common/errorHandlers");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

// configs
dotenv.config({ path: path.join(__dirname, ".env") });
const app = express();

// Database connection
mongoose
	.connect(process.env.MONGO_CONNECTION_STRING)
	.then(() => {
		console.log("Database connection successful!");
	})
	.catch((err) => {
		console.log("Could not connect to database!", err);
	});

// Request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup view engine
app.set("view engine", "ejs");

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// Error handling
app.use(notFoundHandler); // 404
app.use(errorHandler); // common

// Listen to port
const port = parseInt(process.env.DEV, 10) || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

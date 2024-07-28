// Justin Lombardi
// July 27th, 2024
// Version 1.0

// Dependencies
const express = require("express");
const app = express();
app.set("port", process.env.PORT || 3002);
const cors = require("cors");
const eventController = require("./controllers/eventController");
const userController = require("./controllers/userController");
const requestLogger = require("./db/middlewear/request_logger");
// Require the error handlers
const {
	handleErrors,
	handleValidationErrors,
} = require("./db/middlewear/custom_errors");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors());

// Redirect
app.get("/", (req, res) => {
	res.redirect("/api/events");
});

// Controllers
// Forward all requests to localhost:3002/api/events to the post controller
app.use("/api/events", eventController);
app.use("/api", userController);

app.use(handleValidationErrors);
// The catch all for handling errors
app.use(handleErrors);

app.listen(app.get("port"), () => {
	console.log(`connected to port ${app.get("port")}!`);
	console.log("We can get posting...🐧");
});

module.exports = app;

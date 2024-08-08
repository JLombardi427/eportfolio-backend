// Justin Lombardi
// August 8th, 2024
// Version 2.0
//This processes the time and date of the request along with the information associated with the request.
const requestLogger = function (req, res, next) {
	console.log("\n===== Incoming Request =====\n");
	console.log(`${new Date()}`);
	console.log(`${req.method} ${req.url}`);
	console.log(`body ${JSON.stringify(req.body)}`);
	console.log("\n============================\n");
	next();
};

module.exports = requestLogger;

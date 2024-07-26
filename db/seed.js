const mongoose = require("../db/connection");
const seedData = require("./seeds.json");
const Event = require("./models/Event");

// First we delete the events
Event.deleteMany({})
	.then(() => {
		// insert many events docs
		Event.insertMany(seedData).then((event) => {
			console.log("We have events! 🐹");
			console.log(event);
			process.exit();
		});
	})
	.catch((err) => console.error(err));

// Justin Lombardi
// August 8th, 2024
// Version 2.0

//This component is used to seed data into the database from our JSON file. this is to ensure that events can be added to our database.
const mongoose = require("./connection");
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

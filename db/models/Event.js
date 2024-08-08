// Justin Lombardi
// August 8th, 2024
// Version 2.0

//This is the schema that models the events and the information for each event card that will come through in the front end.
const mongoose = require("../connection");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
	name: String,
	date: Date,
	time: String,
	image: String,
	notes: String,
	category: String,
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;

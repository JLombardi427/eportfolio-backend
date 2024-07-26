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

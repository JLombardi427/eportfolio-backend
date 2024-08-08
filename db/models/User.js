// Justin Lombardi
// August 8th, 2024
// Version 2.0

//This is the schema for the users and what is required when creating a user.
const mongoose = require("../connection");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			// ret is the returned Mongoose document
			transform: (_doc, ret) => {
				delete ret.password;
				return ret;
			},
		},
	}
);

const User = mongoose.model("User", UserSchema);

module.exports = User;

// step 1: import mongoose
const mongoose = require("mongoose");

// step 2: make a schema using mongoose.schema({attributes}, {timestamps})
const peopleSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		mobile: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
	},
	{
		timestamps: true,
	}
);
// step 3: make a model using mongoose.model("model Name", Schema)
const People = mngoose.model("People", peopleSchema);

// step 4: export Model
module.exports = People;

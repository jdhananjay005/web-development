const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const asgnSchema = new mongoose.Schema({
	subject: {
		type: String,
		createIndexes: true,
	},
	file: {
		type: String,
		createIndexes: true,
	},
});

const Asgn = mongoose.model("Asgn", asgnSchema);
module.exports = Asgn;

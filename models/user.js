const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new mongoose.Schema({
	username: {
		type: String,
		createIndexes: true,
	},
	password: {
		type: String,
		createIndexes: true,
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
});
userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);
module.exports = User;

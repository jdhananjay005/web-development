const mongoose = require("mongoose");

mongoose.set("debug", true);

mongoose.Promise = Promise;

mongoose.connect("mongodb+srv://User:User@cluster0.vyg72.mongodb.net/StudentPortal?retryWrites=true&w=majority", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

module.exports.User = require("./user");

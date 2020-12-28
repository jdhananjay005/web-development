const mongoose = require("mongoose");

mongoose.set("debug", true);

mongoose.Promise = Promise;

mongoose.connect("mongodb+srv://User:User@cluster0.vyg72.mongodb.net/StudentPortal?retryWrites=true&w=majority", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {console.log("connected to mangodb")}).catch((err) => {console.log("error connecting to mongdb", err)});

module.exports.User = require("./user");

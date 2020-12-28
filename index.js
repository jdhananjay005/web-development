require("dotenv").config(); //.env not needed, already replaced its values here
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const db = require("./models");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(express.static("public"));
app.use(morgan("dev"));

app.use(
    session({
        secret: "our little secret.",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(db.User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    db.User.findById(id, function (err, user) {
        done(err, user);
    });
});

app.use("/student", require("./routes/student"));

app.use((req, res, next) => {
  let err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});


let port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});

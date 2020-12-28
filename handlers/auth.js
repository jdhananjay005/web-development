const db = require("../models");
// const passwordValidator = require("password-validator");
const passport = require("passport");

// var passSchema = new passwordValidator();

// passSchema
//     .is()
//     .min(8) // Minimum length 8
//     .is()
//     .max(15) // Maximum length 15
//     .has()
//     .uppercase() // Must have uppercase letters
//     .has()
//     .lowercase() // Must have lowercase letters
//     .has()
//     .digits() // Must have digits
//     .has()
//     .symbols() // Must have symbols
//     .has()
//     .not()
//     .spaces(); // Dose not contain space

module.exports.login = function (req, res) {
    try {
        console.log(req.body);
        let username = req.body.username;
        let password = req.body.password;
        if(!username || !password) {
            console.log("username or password not valid")
        }
        const user = new db.User({
            username: username,
            password: password,
        });

        if(!user) {
            console.log("user not found");
            res.redirect('/student/auth')
        }

        req.login(user, function (err) {
            if (err) {
                console.log(err);
            } else {
        console.log("here")
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/student");
                });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
};

module.exports.register = async function (req, res) {
    try {
        console.log("here")
        console.log(req.body)
        await db.User.register(
            {
                username: req.body.username,
            },
            req.body.password,
            function (err, user) {
                if (err) {
                    console.log(err);
                    // res.redirect("/professional/register");
                } else {
                    passport.authenticate("local")(req, res, function () {
                        res.redirect("/student");
                    });
                }
            }
        );
    } catch (err) {
        console.log(err);
    }
}

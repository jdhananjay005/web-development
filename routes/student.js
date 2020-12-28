const express = require("express");
const db = require("../models");
const router = express.Router({ mergeParams: true });
const { login, register } = require("../handlers/auth");
// const { forgot, reset } = require("../handlers/forgot");

router.get("/", function (req, res) {
	if (req.isAuthenticated()) {
		res.render("studentdashboard");
	} else {
		// res.render("start");
        res.redirect("/student/auth")
	}
});

// router.get("/forgot", function (req, res) {
//     if (req.isAuthenticated()) {
//         res.render("home");
//     } else {
//         res.render("forgot");
//     }
// });

// router.get("/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] }));
//
//   router.get("/auth/google/Blogging",
//     passport.authenticate("google", { failureRedirect: "/login" }),
//     function(req, res) {
//       // Successful authentication, redirect Home page.
//       res.redirect("/home");
//   });

router.get("/auth", function (req, res) {
	if (req.isAuthenticated()) {
		res.render("studentdashboard");
	} else {
        res.render("auth");
        // console.log("");
	}
});

// router.get("/register", function (req, res) {
//     if (req.isAuthenticated()) {
//         res.render("home");
//     } else {
//         res.render("register");
//     }
// });

// router.get("/home", function (req, res) {
//     if (req.isAuthenticated()) {
//         res.render("home");
//     } else {
//         res.redirect("/professional/login");
//     }
// });

// router.get("/logout", function (req, res) {
//     if (req.isAuthenticated()) {
//         req.logout();
//     }
//     res.redirect("/professional/");
// });

// router.post("/forgot", forgot);
//
// router.get("/reset/:token", function (req, res) {
//     db.User.findOne(
//         {
//             resetPasswordToken: req.params.token,
//             resetPasswordExpires: { $gt: Date.now() },
//         },
//         function (err, user) {
//             if (!user) {
//                 console.log("Password reset token is invalid or has expired.");
//                 return res.redirect("/professional/forgot");
//             }
//             res.render("reset", { token: req.params.token });
//         }
//     );
// });

// router.post("/reset/:token", reset);

router.post("/register", register);

router.post("/login", login);

module.exports = router;

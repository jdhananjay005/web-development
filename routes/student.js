const express = require("express");
const path = require("path");
const db = require("../models");
const router = express.Router({mergeParams: true});
const {login, register} = require("../handlers/auth");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});



// const { forgot, reset } = require("../handlers/forgot");

router.get("/", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("studentdashboard");
    } else {
        // res.render("start");
        res.redirect("/student/auth")
    }
});

router.get("/assignments", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("studentha");
    } else {
        // res.render("start");
        res.redirect("/student/auth")
    }
});

router.get("/assignments/download", function (req, res) {
    const file = `uploads/profile_pic-1609143742464`;
    res.download(file); // Set disposition and send it.
});

router.post('/assignments/upload', (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({storage: storage}).single('profile_pic');

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.redirect("/student/assignments")
    });
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

router.get("/logout", function (req, res) {
    if (req.isAuthenticated()) {
        req.logout();
    }
    res.redirect("/student/");
});

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

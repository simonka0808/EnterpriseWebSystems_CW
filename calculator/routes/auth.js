//import express router and passport

var router = require('express').Router();
var passport = require('passport');

//import Used model

const User = require('../models/User');

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         done(err, user);
//     });
// });



//post request to register user in the db

router.post("/auth/register", async (req, res) => {
    try {
        //make the registration process
        const userToBeRegistered = await User.register({ username: req.body.username }, req.body.password);
        if (userToBeRegistered) {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/display");
            });
        } else {
            res.redirect("/register");
        }

    } catch (err) {
        //return the error
        res.send(err);
    }
});

//post request to login user 


router.post("/auth/login", (req, res) => {
    //add new user object
    const authenticate = new User({
        username: req.body.username,
        password: req.body.passport
    });
    //login method
    req.login(authenticate, (err) => {
        if (err) {
            console.log(err)
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/display");
            });
        }
    });

});
console.log("logout attempt");
//post request to logout
router.post("/auth/logout", (req, res) => {
    console.log("trying to logout");

    req.session.destroy();
    req.logout();
    res.redirect("/");

})



//eport router
module.exports = router;
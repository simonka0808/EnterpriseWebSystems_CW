//import express router and passport

var router = require('express').Router();
var passport = require('passport');

//import Used model

const User = require('../models/User');

passport.use(User.createStrategy());


passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, {
            id: user.id,
            username: user.username,
            checkIfAdmin: user.checkIfAdmin
        });

    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});



//get request to logout
router.get('/auth/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return (err); }
        res.redirect('/');
    });
});

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



//eport router
module.exports = router;
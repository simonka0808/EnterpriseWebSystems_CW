//import express router

const router = require('express').Router();
var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

//create QUOTE model
const Quote = require('../models/SingleQuote');


//get home
router.get("/", (req, res) => {
    //if user is logged in
    if (req.isAuthenticated()) {
        res.redirect('/display')
        //otherwise send them to main page
    } else {
        res.render("index");
    }
});

//get register page
router.get("/register", (req, res) => {
    //if user is logged in
    if (req.isAuthenticated()) {
        res.redirect('/display')
        //otherwise send them to main page
    } else {
        res.render("register");
    }
});

//get login page
router.get("/login", (req, res) => {
    //if user is logged in
    if (req.isAuthenticated()) {
        res.redirect('/display')
        //otherwise send them to main page
    } else {
        res.render("login");
    }
});

//get the page with all quotes

router.get("/display", async (req, res) => {
    try {
        //display all quotes from fb
        const allQuotes = await Quote.find();
        res.render("display", { allQuotes, isAuth: req.isAuthenticated() });


    } catch (err) {
        res.send(err);
    }
});

//get create a quote page(calculator)

router.get("/submit", async (req, res) => {
    //if user is logged in
    if (req.isAuthenticated()) {
        res.render('calculator')
    } else {
        res.redirect("/login");
    }
});


// delete a quote from db

router.get('/delete/:id', (req, res, next) => {
    Quote.findByIdAndDelete({ _id: req.params.id }, (err, docs) => {
        if (err) {
            console.log("something went wrong while deleting");
            next(err);
        } else {
            console.log("Deleted sucessfully!");
            res.redirect('/display');

        }
    })
})


//edit a quote


router.get('/edit/:id', (req, res, next) => {
    console.log(req.params.id);

    Quote.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, docs) => {
        if (err) {
            console.log("Cant edit data because of database issues!");
        } else {
            res.render('edit', { quotedb: docs });
        }
    });
})




//POST
//create a quote
router.post("/submit", async (req, res) => {
    try {
        const quote = new Quote({
            projectName: req.body.projectName,
            devType: req.body.devType,
            hours: req.body.hours


        });

        //save quote in db
        const saveQuote = quote.save();

        //redirect to all quotes if success
        !saveQuote && res.redirect('/submit');
        res.redirect('/display');
    } catch (err) {
        res.send(err);
    }
});




//export 
module.exports = router;
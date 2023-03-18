//import express router

const router = require('express').Router();

//create QUOTE model
const SingleQuote = require('../models/SingleQuote');


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
        const allQuotes = await SingleQuote.find();
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



//POST
//create a quote
router.post("/submit", async (req, res) => {
    try {
        const quote = new SingleQuote({
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


// delete a quote from db

router.post("/delete/:id", async (req, res) => {
    await Post.deleteOne({ _id: req.params.id })
    return res.redirect('/')
});

//export 
module.exports = router;
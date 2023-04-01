//import express router

const router = require('express').Router();
var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

//create QUOTE model
const Quote = require('../models/SingleQuote');
const User = require('../models/User');

let finalBudgetCost;

const pound = "£"


//   getUserWithPosts();

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

//route to show edit element
router.get('/edit/:id', (req, res, next) => {
    console.log(req.params.id);
    if (req.isAuthenticated()) {
        Quote.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, docs) => {
            if (err) {
                console.log("Cant edit data because of database issues!");
                next(err);
            } else {
                res.render('edit', { quotedb: docs });
            }
        });
    } else {
        res.render("login");
    }
})


//POST
//create a quote
router.post("/submit", async (req, res) => {
    let data = req.body;
    // console.log(data);
    try {


        //working hours for the project
        let workingHours = data.hours;


        //any physical resources for the project
        //should be added to the main budget
        totalHardwareRes = data.hardwareRes;
        totalSoftwareRes = data.softwareRes;

        let physicalResources = totalHardwareRes + totalSoftwareRes;



        //hourly pay for each employee based on position
        let seniorPay = 30;
        let standardPay = 20;
        let juniorPay = 10;



        //final pay based on hours and positon
        totalSeniorPay = workingHours * seniorPay;
        totalJuniorPay = workingHours * juniorPay;
        totalStandardPay = workingHours * standardPay;




        if (data.devType == "Junior") {
            finalBudgetCost = (calculateRandomFudgeNum() * totalJuniorPay) + physicalResources

        } else if (data.devType = "Senior") {
            finalBudgetCost = (calculateRandomFudgeNum() * totalSeniorPay) + physicalResources
        } else if (data.devType = "Standard") {
            finalBudgetCost = (calculateRandomFudgeNum() * totalStandardPay) + physicalResources

        }

        // console.log("data ->" + data.hours);
        // console.log("Quote-> " + quote.hours);
        const quote = new Quote({
            projectName: data.projectName,
            devType: data.devType,
            hours: data.hours,
            username: data.username,
            hardwareRes: data.hardwareRes,
            softwareRes: data.softwareRes,
            finalBudget: finalBudgetCost
        });

        //save quote in db
        const saveQuote = quote.save();

        //redirect to all quotes if success
        !saveQuote && res.redirect('/submit');
        res.redirect('/display');

    } catch (err) {
        // res.send(err);
        console.log(err);
    }
});


//route to edit element
router.post('/edit/:id', (req, res, next) => {

    Quote.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, docs) => {

        if (err) {
            console.log("Something went wrong while updating the data!");
            console.log(docs)
            next(err);
        } else {
            res.redirect('/display')

        }
    });
});


function calculateRandomFudgeNum() {

    // fudge factor`s scope
    max = 1.2;
    min = 0.85;

    let fudgeFactor = Math.random() * (max - min) + min;

    return fudgeFactor;
}



//export 
module.exports = router;
//import express router

const router = require('express').Router();
var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

//create QUOTE model
const Quote = require('../models/SingleQuote');
const User = require('../models/User');

let finalBudgetCost;



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

//get profile page
router.get("/profile", (req, res) => {
    //if user is logged in
    if (req.isAuthenticated()) {
        res.render("profile", { user: req.user.username });
        //otherwise send them to main page
    } else {
        res.render("index");
    }
});

//get combine page
router.get("/combine", async (req, res) => {
    //if user is logged in
    try {

        if (req.isAuthenticated()) {

            const combineQuotes = await Quote.find({ username: req.user.username });

            res.render("combine", { combineQuotes });

            //otherwise send them to main page

        } else {
            res.render("index");
        }
    } catch (err) {
        console.log(err)

    }

});

//get combine page
router.post("/combineQuotes", async (req, res) => {
    //if user is logged in
    try {


        if (req.isAuthenticated()) {
            const firstQuoteName = await Quote.find({ projectName: req.body.firstQuoteName });
            const secondQuoteName = await Quote.find({ projectName: req.body.secondQuoteName });



            //combining project names
            var firstProjectName = req.body.firstQuoteName;
            var secondProjectName = req.body.secondQuoteName;
            var combinedProjectNames = firstProjectName.concat(" & ", secondProjectName);

            //getting the hours
            var firstQuoteHours = firstQuoteName[0].hours
            var secondQuoteHours = secondQuoteName[0].hours;
            var combinedHours = firstQuoteHours + secondQuoteHours;

            //getting the final budget

            var firstQuoteBudget = firstQuoteName[0].finalBudget
            var secondQuoteBudget = secondQuoteName[0].finalBudget;
            var combinedBudget = firstQuoteBudget + secondQuoteBudget;


            const combinedQuote = new Quote({
                projectName: combinedProjectNames,
                devType: firstQuoteName[0].devType,
                hours: combinedHours,
                username: firstQuoteName[0].username,
                finalBudget: combinedBudget
            });

            const saveCombinedQuote = combinedQuote.save();

            //redirect to all quotes if success
            !saveCombinedQuote && res.redirect('/combineQuotes');
            res.redirect('/display');


            //otherwise send them to main page
        } else {
            res.render("index");
        }
    } catch (err) {
        console.log(err)

    }

});


//get registration page page
router.get("/register", (req, res) => {
    //if user is logged in
    if (req.isAuthenticated()) {
        res.redirect('/display',)
        //otherwise send them to main page
    } else {
        res.render("register");
    }
});

//get login page
router.get("/login", (req, res) => {
    //if user is logged in
    if (req.isAuthenticated()) {
        res.redirect('/display', { user: req.user.username });
        //otherwise send them to main page
    } else {
        res.render("login");
    }
});

//get the page with all quotes

router.get("/display", async (req, res) => {
    try {
        //display all quotes from fb
        const allQuotes = await Quote.find({ username: req.user.username });
        if (req.isAuthenticated()) {
            res.render("display", { allQuotes, isAuth: req.isAuthenticated() });

        } else {
            res.render("login");

        }

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
        if (req.isAuthenticated()) {
            if (err) {
                console.log("something went wrong while deleting");
                next(err);
            } else {
                console.log("Deleted sucessfully!");
                res.redirect('/display');

            }
        } else {
            res.redirect("/login");

        }
    })
})


//edit a quote

//route to show edit element
router.get('/edit/:id', (req, res, next) => {

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
    try {


        var finalBudget = CalculateFinalBudget(req.body);

        //create an object to be stored in the db with the current valeus
        const quote = new Quote({
            projectName: data.projectName,
            devType: data.devType,
            hours: data.hours,
            username: req.user.username,
            hardwareRes: data.hardwareRes,
            softwareRes: data.softwareRes,
            finalBudget: finalBudget
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

function CalculateFinalBudget(inputQuote) {

    data = inputQuote
    //working hours for the project
    let workingHours = data.hours;


    //any physical resources for the project
    //should be added to the main budget
    totalHardwareRes = data.hardwareRes;
    totalSoftwareRes = data.softwareRes;

    let sumHardwareRes = 0
    let sumSoftwareRes = 0

    for (var i = 0; i < totalHardwareRes.length; i++) {
        sumHardwareRes += Number(totalHardwareRes[i]);
    }

    for (var i = 0; i < totalSoftwareRes.length; i++) {
        sumSoftwareRes += Number(totalSoftwareRes[i]);
    }


    let physicalResources = sumHardwareRes + sumSoftwareRes;



    //hourly pay for each employee based on position
    let seniorPay = 30;
    let standardPay = 20;
    let juniorPay = 10;


    if (data.devType == "Junior") {
        finalBudgetCost = (calculateRandomFudgeNum() * workingHours) * juniorPay + physicalResources

    } else if (data.devType = "Senior") {
        finalBudgetCost = (calculateRandomFudgeNum() * workingHours) * seniorPay + physicalResources
    } else if (data.devType = "Standard") {
        finalBudgetCost = (calculateRandomFudgeNum() * workingHours) * standardPay + physicalResources

    }
    return finalBudgetCost;
}

//route to edit element
router.post('/edit/:id', (req, res, next) => {

    var data = req.body;
    var finalBudgetUpdated = CalculateFinalBudget(req.body);

    //updating an existing quote
    const updatedQuote = {
        projectName: data.projectName,
        devType: data.devType,
        hours: data.hours,
        username: data.username,
        hardwareRes: data.hardwareRes,
        softwareRes: data.softwareRes,
        finalBudget: finalBudgetUpdated
    };


    Quote.findByIdAndUpdate({ _id: req.params.id }, updatedQuote, (err, docs) => {

        if (err) {
            console.log("Something went wrong while updating the data!");
            console.log(docs)
            next(err);
        } else {
            console.log(req.body)
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
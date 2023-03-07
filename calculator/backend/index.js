//https://stackoverflow.com/questions/5823722/how-to-serve-an-image-using-nodejs

var path = require('path');
var express = require('express');
var app = express();

// The database
//const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017/budget_db";

var options = {
    index: "myWebPage.html"
};

var dir = path.join(__dirname, '../frontend');

app.get('/api', function (req, res) {
    res.send("Yes we have an API now")
});

app.get('/api/getBudgetComponents', function (req, res) {
    var h = req.query.hourlyPay;
    var t = req.query.timePeriod;
    var w = req.query.workedHours;

    console.log("Storing quote: " + h + " " + t + " " + w)
    console.log("Mongo URI is " + uri)
    


    // Database stuff
    // Create a new MongoClient
    const client = new MongoClient(uri);
    async function run() {
        try {
            console.log('Start the database stuff');
            var dbo = client.db("budget_db");
            var myobj = { hourlyPay: h, timePeriod: t, workedHours: w };
            await dbo.collection("quotes").insertOne(myobj, function (err, res) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                console.log("1 quote inserted");
            });
            console.log('End the database stuff');

        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);



    res.send("stored ")
})

app.use(express.static(dir, options));

// 404 page
app.use(function (req, res, next) {
    res.send('This page does not exist!')
});

app.listen(8000, function () {
    console.log('Listening on http://localhost:8000/');
});
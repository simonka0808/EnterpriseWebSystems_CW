
//import our packages
require("dotenv").config();
var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");
var passport = require("passport");
var ejs = require("ejs");


//import routes
var authRoute = require("./routes/auth");
var quoteRoute = require("./routes/singleQuote");

const path = require("path");

//setup the application
var app = express();


//setup ejs, body-parser and express-static
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));


//create a ssesion
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

//passport init
app.use(passport.initialize());

//use passport
app.use(passport.session());

//use routes
app.use('/', authRoute);
app.use("/", quoteRoute);

app.use(express.static(__dirname + '/public'));


//connect to db
mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("database connection successfull"))
    .catch(err => console.log(err))

mongoose.set('strictQuery', true);


//start the session
app.listen(process.env.PORT, () => console.log('Server is listening on http://localhost:' + process.env.PORT + '/'));

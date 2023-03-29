//import mongoose, passport-local-mongoose

var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');



//create user Schema

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})




//hash pass using passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose);


//export user model

module.exports = mongoose.model('User', userSchema);






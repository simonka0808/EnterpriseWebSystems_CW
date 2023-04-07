//import mongoose, passport-local-mongoose

var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');



//create user Schema

const userSchema = new mongoose.Schema({
    username: {
        type: 'String'
    },
    password: String,
    checkIfAdmin: {
        type: 'String',
        default: 'False'
    }
})




//hash pass using passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose);


//export user model

module.exports = mongoose.model('User', userSchema);






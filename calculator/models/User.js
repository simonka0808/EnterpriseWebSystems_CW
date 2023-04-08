//import mongoose, passport-local-mongoose

const { required } = require('joi');
var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');



//create user Schema

const userSchema = new mongoose.Schema({
    username: {
        type: 'String',
        required: 'true'
    },
    password: {
        type: 'String'
    },
    checkIfAdmin: {
        type: 'String',
        default: 'False'
    }
    ,
    date: {
        type: Date,
        default: Date.now()
    }
})




//hash pass using passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose);


//export user model

module.exports = mongoose.model('User', userSchema);






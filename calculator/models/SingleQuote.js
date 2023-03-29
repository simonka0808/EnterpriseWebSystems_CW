//import mongoose
var mongoose = require('mongoose');

const user = require('./User');


//create Quote Schema

const quoteSchema = new mongoose.Schema({
    projectName: String,
    devType: String,
    period: String,
    username: {
        type: mongoose.Schema.Types.String,
        ref: 'User'
    },
    hours: {
        type: 'number'
    },
    hardwareRes: { type: Array, "default": [] },
    softwareRes: { type: Array, "default": [] },

    finalBudget: {
        type: 'number'
    }


});


//export quote model
module.exports = mongoose.model('Quote', quoteSchema, 'quotes');





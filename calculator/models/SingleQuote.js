//import mongoose
var mongoose = require('mongoose');

const user = require('./User');


//create Quote Schema

const quoteSchema = new mongoose.Schema({
    projectName: String,
    devType: String,
    period: String,
    username: String,
    hours: {
        type: 'number'
    },
    hardwareRes: { type: Array, "default": [] },
    softwareRes: { type: Array, "default": [] },

    finalBudget: {
        type: mongoose.Decimal128,
        set: v => Math.round(v)
    }


});


//export quote model
module.exports = mongoose.model('Quote', quoteSchema, 'quotes');





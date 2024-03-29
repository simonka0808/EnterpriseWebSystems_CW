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
    hardwareRes: { type: Array, "number": [] },
    softwareRes: { type: Array, "number": [] },

    finalBudget: {
        type: 'number',
    },

    fudge: {
        type: 'String'
    }



});


//export quote model
module.exports = mongoose.model('Quote', quoteSchema, 'quotes');





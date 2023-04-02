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
        get: finalBudget => new mongoose.Types.Decimal128((+finalBudget.toString()).toFixed(2))
    }



});


//export quote model
module.exports = mongoose.model('Quote', quoteSchema, 'quotes');





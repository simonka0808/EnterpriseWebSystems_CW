//import mongoose
var mongoose = require('mongoose');


//create Quote Schema

const quoteSchema = new mongoose.Schema({
    projectName: String,
    devType: String,
    period: String,
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
module.exports = mongoose.model('Quote', quoteSchema);


//import mongoose
var mongoose = require('mongoose');


//create Quote Schema

const quoteSchema = new mongoose.Schema({
    projectName: String,
    devType: String,
    hours: {
        type: 'number'
    },
    monthlyHours: { type: Array, "default": [] },
    weeklyHours: { type: Array, "default": [] },
    annuallyHours: { type: Array, "default": [] }

});


//export quote model
module.exports = mongoose.model('Quote', quoteSchema);


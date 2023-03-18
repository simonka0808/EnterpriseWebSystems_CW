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
    

});


//export quote model
module.exports = mongoose.model('Quote', quoteSchema);


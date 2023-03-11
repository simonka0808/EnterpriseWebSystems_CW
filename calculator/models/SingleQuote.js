//import mongoose
var mongoose = require('mongoose');


//create Quote Schema

const quoteSchema = new mongoose.Schema({
projectName: String,
devType: String,
hours:{
    type:Number,
    default:0
}
});


//export quote model
module.exports = mongoose.model('Quote',quoteSchema);


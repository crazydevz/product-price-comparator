const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:Number,
    name: String,
    feedbackGiven: [Object],
    feedbackReceived: [Object],
});

module.exports= mongoose.model('user', userSchema,'users');
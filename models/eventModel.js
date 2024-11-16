const mongoose = require("mongoose") 


const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location : { type: String, required: true },
    category : { type: String},
    attendees: [{type: mongoose.Schema.Types.ObjectId , ref:'user'}],
    organizer: [{type: mongoose.Schema.Types.ObjectId , ref:'user', required:true}],
});

module.exports = mongoose.model('event',eventSchema)

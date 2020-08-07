const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail:String,
    sport:String,
    date: Date,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    toJSON:{
        virtuals: true
    }
});

EventsSchema.virtual("thumbnail_url").get(function(){
    return `http://localhost:8000/files/${this.thumbnail}`
})

module.exports = mongoose.model('Events' , EventsSchema )
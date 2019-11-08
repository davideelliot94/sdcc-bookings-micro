const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    date: Date,
    start: Date,
    end: Date,
    id_user: Number,
    room: {id: Number, name: String},
    teaching: {id: Number,name:String,id_prof:String }
    
  });
  
  module.exports = mongoose.model("Booking", BookingSchema);
  

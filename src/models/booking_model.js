const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    id: Number,
    startDate: Date,
    endDate: Date,
    roomId: Number,
    teaching: String,
    timestamp: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model("Booking", BookingSchema);
  

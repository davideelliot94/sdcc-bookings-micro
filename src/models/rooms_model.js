const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    id: Number,  
    name: String
    
  });
  
  module.exports = mongoose.model("Room", AulaSchema);
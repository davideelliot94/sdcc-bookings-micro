const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: String
    
  });
  
  module.exports = mongoose.model("Room", RoomSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: String,
    type: String,
    id: Number
  });
  
  module.exports = mongoose.model("Room", AulaSchema);
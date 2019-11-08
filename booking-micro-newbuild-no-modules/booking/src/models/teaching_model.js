const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeachingSchema = new Schema({
    name: String,
    id_prof: Number,
    id_studend: Number,    
  });
  
  module.exports = mongoose.model("Teaching", TeachingSchema);
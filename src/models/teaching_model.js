const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeachingSchema = new Schema({
    __id: String,  
    name: String,
    id_prof: Number,
    //id_studend: [,],    
  });
  
  module.exports = mongoose.model("Teaching", TeachingSchema);
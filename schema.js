const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({

  tile: { type: String, required: true },
  director: {type:String,required:true},
  genre: {type:String,required:true},
  releaseYear: {type:Number},
  availableCopies: {type:Number,required:true},
  
});

module.exports = mongoose.model("User", Userschema);
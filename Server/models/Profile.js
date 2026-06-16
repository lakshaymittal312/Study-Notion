const mongoose = require("mongoose");

/*
    Stores additional information
    about the user.
*/

const profileSchema = new mongoose.Schema({

   // Male/Female/Other
   gender:{
    type:String,
   },

   // Date of birth
   dateOfBirth:{
    type:String,
   },

   // Bio/About section
   about:{
    type:String,
    trim:true,
   },

   // User contact number
   contactNumber:{
    type:Number,
   }
});

module.exports = mongoose.model("Profile", profileSchema);
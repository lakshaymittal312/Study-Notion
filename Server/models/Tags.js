const mongoose = require("mongoose");

/*
    Used to categorize courses.

    Examples:
    Web Development,
    Data Science,
    AI/ML
*/

const tagschema = new mongoose.Schema({

   // Tag name
   name:{
    type:String,
    required:true,
   },

   // Tag description
   description:{
    type:String,
   },

   /*
      Links Tag → Course

      One Tag ---- Many Courses

      Ideally this should be an ARRAY.
   */
   course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course",
   }
});

module.exports = mongoose.model("Tag", tagschema);
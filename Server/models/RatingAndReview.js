const mongoose = require("mongoose");

/*
    Stores feedback given by students.
*/

const ratingAndReview = new mongoose.Schema({

   /*
      Links Review → User

      Student who wrote review.
   */
   user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
   },

   // Rating out of 5
   rating:{
      type:Number,
      required:true,
   },

   // Written feedback
   review:{
      type:String,
      required:true,
   }
});

module.exports = mongoose.model("RatingAndReview", ratingAndReview);
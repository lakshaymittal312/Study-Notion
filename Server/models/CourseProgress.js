const mongoose = require("mongoose");

/*
    Tracks progress of a student
    in a particular course.
*/

const courseProgress = new mongoose.Schema({

   /*
      Links Progress → Course

      One CourseProgress belongs to
      one Course.
   */
   courseID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course",
   },

   /*
      Stores completed videos.

      Links CourseProgress → SubSection

      One Progress ---- Many Completed Videos
   */
   completedVideos:[
   {
    type:mongoose.Schema.Types.ObjectId,
    ref:"SubSection",
   }
  ],
});

module.exports = mongoose.model("CourseProgress",courseProgress);
const mongoose = require("mongoose");

/*
    Stores complete course details.
*/

const courseSchema = new mongoose.Schema({

   // Course title
   courseName:{
    type:String,
   },

   // Short description
   courseDescription:{
    type:String,
   },

   /*
      Links Course → User

      Instructor who created the course.

      One Instructor ---- Many Courses
   */
   instructor:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
   },

   // Learning outcomes
   whatYouWillLearn:{
      type:String,
   },

   /*
      Links Course → Section

      One Course ---- Many Sections
   */
   courseContent:[
      {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Section"
      }
   ],

   /*
      Links Course → RatingAndReview

      One Course ---- Many Reviews
   */
   ratingAndReviews:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:"RatingAndReview",
      }
   ],

   // Course price
   price:{
      type:Number,
   },

   // Thumbnail image URL
   thumbnail:{
      type:String,
   },

   /*
      Links Course → Tag

      One Tag can belong to many courses.

      Ideally this should be an ARRAY because
      a course can have multiple tags.
   */
   tag:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Tag",
   },

   /*
      Links Course → User

      Students enrolled in course.

      One Course ---- Many Students
   */
   studentsEnrolled:[
      {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
      }
   ]
});

module.exports = mongoose.model("Course", courseSchema);